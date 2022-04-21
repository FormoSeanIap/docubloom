import 'dotenv/config';
import { collection_docs, collection_users } from './mongodb.js';
import { ObjectId } from 'mongodb';

import { DOC_ROLE } from '../../utils/constants.js';

const getUsers = async (docId) => {
  try {
    const users = await collection_docs.findOne({'_id': ObjectId(docId)}, {projection: { _id: 0, users: 1}});
    return users.users;
  } catch (err) {
    console.log(err);
    return { err };
  }
};

const getOwner = async (ownerId) => {
  try {
    const owner = await collection_users.findOne({'_id': ObjectId(ownerId)}, {projection: { _id: 0, name: 1, email: 1}});
    return owner;
  } catch (err) {
    console.error('get owner error:', err.message);
    return { error: err.message };
  }
};

const getEditor = async (editorId) => {
  try {
      const editor = await collection_users.findOne({'_id': ObjectId(editorId)}, {projection: { name: 1, email: 1, _id: 0}});
      return editor;
  } catch (err) {
      console.error('get editor error:', err.message);
      return { error: err.message };
  }
};

const getViewer = async (viewerId) => {
  try {
      const viewer = await collection_users.findOne({'_id': ObjectId(viewerId)}, {projection: { name: 1, email: 1, _id: 0}});
      return viewer;
  } catch (err) {
      console.error('get viewer error:', err.message);
      return { error: err.message };
  }
};

const addUser = async (docId, userId, role) => {

  try {
    const user = await collection_docs.findOne(
      {
        $and: [
          {'_id': ObjectId(docId)},
          {[`users.${userId}`]: { $exists: true }}
        ]
      },
      {projection: {[`users.${userId}`]: 1, _id: 0}}
    );
    if (user) {
      return {
        status: 400,
        error: 'user already in this document',
      };
    }

    const result = await collection_docs.findOneAndUpdate(
      {'_id': ObjectId(docId)},
      {$set: {[`users.${userId}`]: role}},
      {returnOriginal: false, 'returnDocument' : 'after'}
    );
    return result;
  } catch (err) {
    console.error('add user error:', err.message);
    return { error: err.message };
  }
};

const updateUser = async (docId, userId, role) => {

  try {
    const user = await collection_docs.findOne(
      {
        $and: [
          {'_id': ObjectId(docId)},
          {[`users.${userId}`]: { $exists: true }}
        ]
      },
      {projection: {[`users.${userId}`]: 1, _id: 0}}
    );
    if (!user) {
      return {
        status: 400,
        error: 'user does not exist in this document',
      };
    }

    const result = await collection_docs.findOneAndUpdate(
        {'_id': ObjectId(docId)},
        {$set: {[`users.${userId}`]: role}},
        {returnOriginal: false, 'returnDocument' : 'after'}
    );
    return result;
  } catch (err) {
    console.error('update user error:', err.message);
    return { error: err.message };
  }
};

const deleteUser = async (docId, userId) => {
  try {
      const result = await collection_docs.findOneAndUpdate(
          {'_id': ObjectId(docId)},
          {$unset: {[`users.${userId}`]: 1}},
          {returnOriginal: false, 'returnDocument' : 'after'}
      );
      return result;
  } catch (err) {
      console.error('delete user error:', err.message);
      return { error: err.message };
  }
};

const getDoc = async (docId) => {
  try {
      const doc = await collection_docs.findOne({'_id': ObjectId(docId)}, {projection: {data: 1, _id: 0}});
      return doc;
  } catch (err) {
      console.error('get doc error:', err.message);
      return { error: err.message };
  }
};

const createDoc = async (userId, doc) => {
  try {
      const result = await collection_docs.insertOne({
          users: {[userId]: DOC_ROLE.OWNER},
          data: doc,
      });
      return result;
  } catch (err) {
      console.error('create doc error:', err.message);
      return { error: err.message };
  }
};

const editDoc = async (docId, doc) => {
  try {
      const result = await collection_docs.findOneAndUpdate(
              {'_id': ObjectId(docId)},
              {$set: {data: doc}},
          );
      return result;
  } catch (err) {
      console.error('edit doc error:', err.message);
      return { error: err.message };
  }
};

const deleteDoc = async (docId) => {
  try {
      const result = await collection_docs.deleteOne({'_id': ObjectId(docId)});
      return result;
  } catch (err) {
      console.error('delete doc error:', err.message);
      return { error: err.message };
  }
};

const getDocRole = async (userId, docId) => {
  try {
      const result = await collection_docs.findOne({'_id': ObjectId(docId)}, {projection: {[`users.${userId}`]: 1, _id: 0}});
      return result.users[userId];
  } catch (err) {
      return null;
  }
};

export {
  DOC_ROLE,
  getDocRole,
  getDoc,
  createDoc,
  editDoc,
  updateUser,
  deleteDoc,
  getUsers,
  addUser,
  deleteUser,
  getOwner,
  getEditor,
  getViewer,
};