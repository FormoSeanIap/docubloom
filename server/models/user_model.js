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
        const rawDocInfos = await collection.find({[`users.${userId}`]: {"$exists": true}}).project({data: 0}).toArray();

        const docInfos = rawDocInfos.map(info => {
            info['id'] = info._id.toHexString();
            delete info._id;

            info['role'] = Object.keys(DOC_ROLE).find(key => DOC_ROLE[key] === info.users[userId]).toLowerCase();
            delete info.users;

            return info;
        })

        return docInfos;
    } catch (err) {
        console.log('get user docs error:', err);
        return null;
    }
};

const getDocRole = async (userId, docId) => {
    try {
        const result = await collection.findOne({"_id": ObjectId(docId)}, {projection: {[`users.${userId}`]: 1, _id: 0}});
        return result.users[userId];
    } catch (err) {
        return null;
    }
};

const getDoc = async (doc_id) => {
    try {
        const doc = await collection.findOne({"_id": ObjectId(doc_id)}, {projection: {data: 1, _id: 0}});
        return doc;
    } catch (err) {
        console.error('get doc error:', err.message);
        return { error: err.message };
    }
  }

const createDoc = async (userId, doc) => {
    try {
        const result = await collection.insertOne({
            users: {[userId]: DOC_ROLE.OWNER},
            data: doc,
        });
        return result;
    } catch (err) {
        console.error('create doc error:', err.message);
        return { error: err.message };
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

const deleteDoc = async (docId) => {
    try {
        const result = await collection.deleteOne({"_id": ObjectId(docId)});
        return result;
    } catch (err) {
        console.error('delete doc error:', err.message);
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
    deleteDoc,
};