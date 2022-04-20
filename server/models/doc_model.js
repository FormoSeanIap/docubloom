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

export {
  getUsers,
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value);
}