import 'dotenv/config.js';
import { docCollection, userCollection } from './mongodb.js';

const signUp = async (user) => {
  try {
    return await userCollection.insertOne(user);
  } catch (error) {
    console.error('sign up error:', error);
    return { error: error.message };
  }
};

const nativeSignIn = async (user, loginAt, updatedDt) => {
  try {
    return await userCollection.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          last_login_at: loginAt,
          updated_dt: updatedDt,
        },
      },
    );
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
