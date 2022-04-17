import 'dotenv/config';
import { pool } from './mysqlcon.js';
import { client, collection } from './mongodb.js';
import { ObjectId } from 'mongodb';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

const DOC_ROLE = {
    OWNER: 'O',
    EDITOR: 'E',
    VIEWER: 'V',
}

const signUp = async (name, email, password) => {
  const conn = await pool.getConnection();
  try {
      await conn.query('START TRANSACTION');

      const emails = await conn.query('SELECT email FROM user WHERE email = ? FOR UPDATE', [email]);
      if (emails[0].length > 0) {
          await conn.query('COMMIT');
          return { error: 'Email Already Exists' };
      }

      const hashedPwd = await argon2.hash(password);

      const loginAt = dayjs().format();

      const user = {
          provider: 'native',
          email,
          password: hashedPwd,
          name,
          last_login_at: loginAt,
      };

      const queryStr = 'INSERT INTO user SET ?';
      const [result] = await conn.query(queryStr, user);

      const accessToken = jwt.sign(
          {
              name: user.name,
              email: user.email,
          },
          TOKEN_SECRET,
          { expiresIn: TOKEN_EXPIRE },
      );
      user.access_token = accessToken;
      user.access_expired = TOKEN_EXPIRE;

      user.id = result.insertId;
      await conn.query('COMMIT');
      return { user };
  } catch (error) {
      console.log(error);
      await conn.query('ROLLBACK');
      return { error };
  } finally {
      await conn.release();
  }
};

const nativeSignIn = async (email, password) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');

        const [[user]] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);

        if (!await argon2.verify(user.password, password)) {
            await conn.query('COMMIT');
            return { error: 'Password is wrong' };
        }

        const loginAt = dayjs().format();
        
        const accessToken = jwt.sign(
            {
                provider: user.provider,
                name: user.name,
                email: user.email,
            },
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE },
        );

        const queryStr = 'UPDATE user SET last_login_at = ? WHERE id = ?';
        await conn.query(queryStr, [loginAt, user.id]);

        await conn.query('COMMIT');

        user.access_token = accessToken;
        user.access_expired = TOKEN_EXPIRE;
        user.login_at = loginAt;

        return { user };
    } catch (error) {
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
};

const getUserDetail = async (email) => {
    try {
        const [user] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        return user[0];
    } catch (err) {
        console.log('get user details error:', err);
        return null;
    }
};

const getUserDocs = async (userId) => {
    try {
        const [rawDocs] = await pool.query('SELECT doc_id, role FROM user_doc WHERE user_id = ?', [userId]);
        const docs = await Promise.all(rawDocs.map(async (doc) => {
            const [[{user_id: ownerId}]] = await pool.query('SELECT user_id FROM user_doc WHERE doc_id = ? AND role = ?', [doc.doc_id, DOC_ROLE.OWNER]);
            const [[{name: ownerName}]] = await pool.query('SELECT name FROM user WHERE id = ?', [ownerId]);
            doc.owner = ownerName
            return doc;
        }));
        return docs;
    } catch (err) {
        console.log('get user docs error:', err);
        return null;
    }
};

const getDocRole = async (userId, docId) => {
    try {
        const [results] = await pool.query('SELECT role FROM user_doc WHERE user_id = ? AND doc_id = ?', [userId, docId]);
        return results[0];
    } catch (err) {
        return null;
    }
};

const getDoc = async (doc_id) => {
    try {
        const doc = await collection.find({"_id": ObjectId(doc_id)}).toArray();
        return doc;
    } catch (err) {
        console.error('get doc error:', err.message);
        return { error: err.message };
    }
  }

const createDoc = async (userId, doc) => {
    const conn = await pool.getConnection();
    const session = client.startSession();
    try {
        session.startTransaction();
        const result = await collection.insertOne({data: doc}, {session});
        
        await conn.query('START TRANSACTION');
        const user = {
            user_id: userId,
            doc_id: result.insertedId.toString(),
            role: 'O',
        };
        const queryStr = 'INSERT INTO user_doc SET ?';
        await conn.query(queryStr, user);

        await session.commitTransaction();
        await conn.query('COMMIT');

        return result;
    } catch (err) {
        await conn.query('ROLLBACK');
        await session.abortTransaction();

        console.error('create doc error:', err.message);
        return { error: err.message };
    } finally {
        await conn.release();
        await session.endSession();
    }
  }

const editDoc = async (docId, doc) => {
    try {
        const result = await collection.findOneAndUpdate(
                {"_id": ObjectId(docId)},
                {$set: {data: doc}},
            );
        return result;
    } catch (err) {
        console.error('edit doc error:', err.message);
        return { error: err.message };
    } 
}

export { 
    DOC_ROLE,
    signUp, 
    nativeSignIn, 
    getUserDetail, 
    getUserDocs, 
    getDocRole,
    getDoc,
    createDoc, 
    editDoc,
};