import 'dotenv/config.js';
import { ObjectId } from 'mongodb';
import { docCollection, userCollection } from './mongodb.js';

const signUp = async (user) => {
  try {
    return await userCollection.insertOne(user);
  } catch (err) {
    console.error('sign up error:', err);
    return { error: err };
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
  } catch (err) {
    console.error('native sign in error:', err);
    return { error: err };
  }
};

// TODO: get user detail by email
const getUserDetail = async (email) => {
  try {
    return await userCollection.findOne({ email });
  } catch (err) {
    console.error('get user detail error:', err);
    return { error: err };
  }
};

const getUserDetailById = async (userId) => {
  try {
    return await userCollection.findOne({ _id: ObjectId(userId) });
  } catch (err) {
    console.error('get user detail by Id error:', err);
    return { error: err };
  }
};

const getMultiUsersDetailsById = async (userIds) => {
  try {
    return await userCollection.find({ _id: { $in: userIds.map((id) => ObjectId(id)) } }).toArray();
  } catch (err) {
    console.error('get multi users details by Id error:', err);
    return { error: err };
  }
};

const getUserDocs = async (userId) => {
  try {
    return await docCollection
      .find({ [`users.${userId}`]: { $exists: true } })
      .project({ users: 1, 'data.info': 1, 'data.openapi': 1 })
      .toArray();
  } catch (err) {
    console.error('get user docs error:', err);
    return { error: err };
  }
};

export {
  signUp,
  nativeSignIn,
  getUserDetail,
  getUserDetailById,
  getMultiUsersDetailsById,
  getUserDocs,
};
