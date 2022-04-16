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

      const loginAt = dayjs().format();
      const signupAt = dayjs().format();

      const user = {
          provider: 'native',
          email,
          password: 'test', //TODO:
          name,
          login_at: loginAt,
          signup_at: signupAt,
      };

      const queryStr = 'INSERT INTO user SET ?';
      const [result] = await conn.query(queryStr, user);

      const accessToken = jwt.sign(
          {
              name: user.name,
              email: user.email,
          },
          TOKEN_SECRET
      );
      user.access_token = accessToken;

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

export { signUp };