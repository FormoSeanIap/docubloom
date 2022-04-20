import 'dotenv/config';
import { client, collection_docs, collection_users } from './mongodb.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const DOC_ROLE = {
  OWNER: 'O',
  EDITOR: 'E',
  VIEWER: 'V',
}

const getUsers = async (docId) => {
  try {
    const users = await collection_docs.findOne({"_id": ObjectId(docId)}, {projection: { _id: 0, users: 1}});
    const [ownerId] = getKeysByValue(users.users, DOC_ROLE.OWNER);
    const editorIds = getKeysByValue(users.users, DOC_ROLE.EDITOR);
    const viewerIds = getKeysByValue(users.users, DOC_ROLE.VIEWER);

    const owner = await collection_users.findOne({"_id": ObjectId(ownerId)}, {projection: { _id: 0, name: 1, email: 1}});
    owner.id = ownerId;

    const editors = await Promise.all(editorIds.map(async (id) => {
      const user = await collection_users.findOne({"_id": ObjectId(id)}, {projection: { _id: 0, name: 1, email: 1}});
      user.id = id;
      return user;
    }))

    const viewers = await Promise.all(viewerIds.map(async (id) => {
      const user = await collection_users.findOne({"_id": ObjectId(id)}, {projection: { _id: 0, name: 1, email: 1}});
      user.id = id;
      return user;
    }))

    return { owner, editors, viewers };
  } catch (err) {
    console.log(err);
    return { err };
  }
};

const getDoc = async (docId) => {
  try {
      const doc = await collection_docs.findOne({"_id": ObjectId(docId)}, {projection: {data: 1, _id: 0}});
      return doc;
  } catch (err) {
      console.error('get doc error:', err.message);
      return { error: err.message };
  }
}

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
}

const editDoc = async (docId, doc) => {
  try {
      const result = await collection_docs.findOneAndUpdate(
              {"_id": ObjectId(docId)},
              {$set: {data: doc}},
          );
      return result;
  } catch (err) {
      console.error('edit doc error:', err.message);
      return { error: err.message };
  } 
}

const deleteDoc = async (docId) => {
  try {
      const result = await collection_docs.deleteOne({"_id": ObjectId(docId)});
      return result;
  } catch (err) {
      console.error('delete doc error:', err.message);
      return { error: err.message };
  } 
}

const getDocRole = async (userId, docId) => {
  try {
      const result = await collection_docs.findOne({"_id": ObjectId(docId)}, {projection: {[`users.${userId}`]: 1, _id: 0}});
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
  deleteDoc,
  getUsers,
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value);
}