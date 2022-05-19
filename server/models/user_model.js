import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { docCollection, userCollection } from './mongodb.js';

const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

const DOC_ROLE = {
  OWNER: 'O',
  EDITOR: 'E',
  VIEWER: 'V',
};

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
    return { error };
  }
};

const nativeSignIn = async (user) => {
  try {
    const loginAt = dayjs().format();
    const updatedDt = dayjs().format();

    const accessToken = jwt.sign(
      {
        provider: user.provider,
        name: user.name,
        email: user.email,
      },
      TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRE },
    );

    user.access_token = accessToken;
    user.access_expired = TOKEN_EXPIRE;
    user.login_at = loginAt;

    await userCollection.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          last_login_at: loginAt,
          updated_dt: updatedDt,
        },
      },
    );

    return { user };
  } catch (error) {
    console.error('native sign in error:', error);
    return { error };
  }
};

const getUserDetail = async (email) => {
  try {
    const user = await userCollection.findOne({ email });
    user.id = user._id.toHexString();
    delete user._id;
    return user;
  } catch (err) {
    // console.error('get user detail error:', err);
    return null;
  }
};

const getUserDocs = async (userId) => {
  try {
    // const rawDocInfos = await collection
    // .find({[`users.${userId}`]: {"$exists": true}}).project({data: 0})
    // .toArray();

    const rawDocInfos = await docCollection.find({ [`users.${userId}`]: { $exists: true } }).project({ users: 1, 'data.info': 1, 'data.openapi': 1 }).toArray();

    const docInfos = rawDocInfos.map((info) => {
      info.id = info._id.toHexString();
      delete info._id;

      info.role = Object.keys(DOC_ROLE)
        .find((key) => DOC_ROLE[key] === info.users[userId])
        .toLowerCase();
      delete info.users;

      if (info.data && info.data.info) {
        info.info = info.data.info;
      } else {
        info.info = '';
      }

      if (info.data && info.data.openapi) {
        info.openapi = info.data.openapi;
      } else {
        info.openapi = '';
      }
      delete info.data;

      return info;
    });

    return docInfos;
  } catch (err) {
    console.log('get user docs error:', err);
    return null;
  }
};

export {
  signUp,
  nativeSignIn,
  getUserDetail,
  getUserDocs,
};
