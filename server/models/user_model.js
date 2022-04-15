require('dotenv').config();
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds
const { pool } = require('./mysqlcon');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

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
          email,
          //TODO: password: bcrypt.hashSync(password, salt),
          name,
          login_at: loginAt,
          signup_at: signupAt,
      };
      const accessToken = jwt.sign(
          {
              name: user.name,
              email: user.email,
          },
          TOKEN_SECRET
      );
      user.access_token = accessToken;

      const queryStr = 'INSERT INTO user SET ?';
      const [result] = await conn.query(queryStr, user);

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

module.exports = {
  signUp,
}

// export { signUp };