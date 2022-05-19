import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { docCollection, userCollection } from './mongodb.js';

const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

const signUp = async (name, email, hash) => {
  try {
    const loginAt = dayjs().format();
    const createdDt = dayjs().format();
    const updatedDt = dayjs().format();

    const user = {
      provider: 'native',
      email,
      password: hash,
      name,
      last_login_at: loginAt,
      created_dt: createdDt,
      updated_dt: updatedDt,
    };

    const result = await userCollection.insertOne(user);

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

    user.id = result.insertedId.toHexString();
    return { user };
  } catch (error) {
    console.error('sign up error:', error);
    return { error: error.message };
  }
};

const nativeSignIn = async (user) => {
  try {
    const loginAt = dayjs().format();
    const updatedDt = dayjs().format();

    // TODO: move this to util
    const accessToken = jwt.sign(
      {
        provider: user.provider,
        name: user.name,
        email: user.email,
      },
      TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRE },
    );

    const signInUser = {
      ...user,
      access_token: accessToken,
      access_expired: TOKEN_EXPIRE,
      login_at: loginAt,
    };

    await userCollection.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          last_login_at: loginAt,
          updated_dt: updatedDt,
        },
      },
    );

    return { user: signInUser };
  } catch (error) {
    console.error('native sign in error:', error);
    return { error: error.message };
  }
};

const getUserDetail = async (email) => {
  try {
    return await userCollection.findOne({ email });
  } catch (error) {
    console.error('get user detail error:', error);
    return { error: error.message };
  }
};

const getUserDocs = async (userId) => {
  try {
    return await docCollection
      .find({ [`users.${userId}`]: { $exists: true } })
      .project({ users: 1, 'data.info': 1, 'data.openapi': 1 })
      .toArray();
  } catch (error) {
    console.error('get user docs error:', error);
    return { error: error.message };
  }
};

export {
  signUp,
  nativeSignIn,
  getUserDetail,
  getUserDocs,
};
