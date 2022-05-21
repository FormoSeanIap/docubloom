import 'dotenv/config.js';
import { ObjectId } from 'mongodb';
import { docCollection } from './mongodb.js';
import { DOC_ROLE } from '../../utils/constants.js';

const getUser = async (docId, userId) => {
  try {
    return await docCollection.findOne(
      {
        $and: [
          { _id: ObjectId(docId) },
          { [`users.${userId}`]: { $exists: true } },
        ],
      },
      { projection: { [`users.${userId}`]: 1, _id: 0 } },
    );
  } catch (err) {
    console.error('get user error:', err);
    return { error: err };
  }
};

const getUsers = async (docId) => {
  try {
    return await docCollection.findOne(
      { _id: ObjectId(docId) },
      { projection: { _id: 0, users: 1 } },
    );
  } catch (err) {
    console.error('get users error:', err);
    return { error: err };
  }
};

const addUser = async (docId, userId, role) => {
  try {
    return await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { [`users.${userId}`]: role } },
      { returnOriginal: false, returnDocument: 'after' },
    );
  } catch (err) {
    console.error('add user error:', err);
    return { error: err };
  }
};

const updateUser = async (docId, userId, role) => {
  try {
    return await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { [`users.${userId}`]: role } },
      { returnOriginal: false, returnDocument: 'after' },
    );
  } catch (err) {
    console.error('update user error:', err);
    return { error: err };
  }
};

const deleteUser = async (docId, userId) => {
  try {
    return await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $unset: { [`users.${userId}`]: 1 } },
      { returnOriginal: false, returnDocument: 'after' },
    );
  } catch (err) {
    console.error('delete user from doc error:', err);
    return { error: err };
  }
};

const getDoc = async (docId) => {
  try {
    return await docCollection.findOne(
      { _id: ObjectId(docId) },
      { projection: { data: 1, _id: 0 } },
    );
  } catch (err) {
    console.error('get doc error:', err);
    return { error: err };
  }
};

const createDoc = async (userId, doc) => {
  try {
    return await docCollection.insertOne({
      users: { [userId]: DOC_ROLE.OWNER },
      data: doc,
    });
  } catch (err) {
    console.error('create doc error:', err);
    return { error: err };
  }
};

const editDoc = async (docId, doc) => {
  try {
    return await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { data: doc } },
    );
  } catch (err) {
    console.error('edit doc error:', err);
    return { error: err };
  }
};

const deleteDoc = async (docId) => {
  try {
    const result = await docCollection.deleteOne({ _id: ObjectId(docId) });
    return result;
  } catch (err) {
    console.error('delete doc error:', err);
    return { error: err };
  }
};

const getDocRole = async (userId, docId) => {
  try {
    return await docCollection.findOne(
      { _id: ObjectId(docId) },
      { projection: { [`users.${userId}`]: 1, _id: 0 } },
    );
  } catch (err) {
    console.error('get doc role error:', err);
    return { error: err };
  }
};

export {
  getDocRole,
  getDoc,
  createDoc,
  editDoc,
  updateUser,
  deleteDoc,
  getUser,
  getUsers,
  addUser,
  deleteUser,
};
