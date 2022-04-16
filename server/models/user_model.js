import 'dotenv/config';
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds
import { pool } from './mysqlcon.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

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
        const [[user]] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        return user;
    } catch (e) {
        return null;
    }
};


export { signUp, nativeSignIn, getUserDetail };