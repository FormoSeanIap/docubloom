import 'dotenv/config.js';
import { ObjectId } from 'mongodb';
import { docCollection, userCollection } from './mongodb.js';
import { DOC_ROLE } from '../../utils/constants.js';

// TODO: what should I return if catch error?

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
  } catch (error) {
    console.error('get user error:', error.message);
    return { error: error.message };
  }
};

const getUsers = async (docId) => {
  try {
    const users = await docCollection.findOne(
      { _id: ObjectId(docId) },
      { projection: { _id: 0, users: 1 } },
    );
    return users.users;
  } catch (error) {
    console.error('get users error:', error.message);
    return null;
  }
};

const getOwner = async (ownerId) => {
  try {
    const owner = await userCollection.findOne(
      { _id: ObjectId(ownerId) },
      { projection: { _id: 0, name: 1, email: 1 } },
    );
    return owner;
  } catch (error) {
    console.error('get owner error:', error.message);
    return null;
  }
};

const getEditor = async (editorId) => {
  try {
    const editor = await userCollection.findOne(
      { _id: ObjectId(editorId) },
      { projection: { name: 1, email: 1, _id: 0 } },
    );
    return editor;
  } catch (error) {
    console.error('get editor error:', error.message);
    return null;
  }
};

const getViewer = async (viewerId) => {
  try {
    const viewer = await userCollection.findOne(
      { _id: ObjectId(viewerId) },
      { projection: { name: 1, email: 1, _id: 0 } },
    );
    return viewer;
  } catch (error) {
    console.error('get viewer error:', error.message);
    return null;
  }
};

const addUser = async (docId, userId, role) => {
  try {
    const result = await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { [`users.${userId}`]: role } },
      { returnOriginal: false, returnDocument: 'after' },
    );
    return result;
  } catch (error) {
    console.error('add user error:', error.message);
    return { error: error.message };
  }
};

const updateUser = async (docId, userId, role) => {
  try {
    const result = await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { [`users.${userId}`]: role } },
      { returnOriginal: false, returnDocument: 'after' },
    );
    return result;
  } catch (error) {
    console.error('update user error:', error.message);
    return { error: error.message };
  }
};

const deleteUser = async (docId, userId) => {
  try {
    const result = await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $unset: { [`users.${userId}`]: 1 } },
      { returnOriginal: false, returnDocument: 'after' },
    );
    return result;
  } catch (error) {
    console.error('delete user from doc error:', error.message);
    return { error: error.message };
  }
};

const getDoc = async (docId) => {
  try {
    const doc = await docCollection.findOne(
      { _id: ObjectId(docId) },
      { projection: { data: 1, _id: 0 } },
    );
    return doc;
  } catch (error) {
    console.error('get doc error:', error.message);
    return null;
  }
};

const createDoc = async (userId, doc) => {
  try {
    const result = await docCollection.insertOne({
      users: { [userId]: DOC_ROLE.OWNER },
      data: doc,
    });
    return result;
  } catch (error) {
    console.error('create doc error:', error.message);
    return { error: error.message };
  }
};

const editDoc = async (docId, doc) => {
  try {
    const result = await docCollection.findOneAndUpdate(
      { _id: ObjectId(docId) },
      { $set: { data: doc } },
    );
    return result;
  } catch (error) {
    console.error('edit doc error:', error.message);
    return { error: error.message };
  }
};

const deleteDoc = async (docId) => {
  try {
    const result = await docCollection.deleteOne({ _id: ObjectId(docId) });
    return result;
  } catch (error) {
    console.error('delete doc error:', error.message);
    return { error: error.message };
  }
};

const getDocRole = async (userId, docId) => {
  try {
    const result = await docCollection.findOne({ _id: ObjectId(docId) }, { projection: { [`users.${userId}`]: 1, _id: 0 } });
    return result.users[userId];
  } catch (error) {
    return null;
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
  getOwner,
  getEditor,
  getViewer,
};
