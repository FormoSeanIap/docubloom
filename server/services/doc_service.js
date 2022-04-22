import * as Doc from '../models/doc_model.js';
import * as User from '../models/user_model.js';

import { DOC_ROLE } from '../../utils/constants.js';

function getDBDocRole(role) {
  return DOC_ROLE[role.toUpperCase()];
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value);
}

const getUsers = async (docId) => {
  try {

    const users = await Doc.getUsers(docId);

    const ownerIds = getKeysByValue(users, DOC_ROLE.OWNER);
    const editorIds = getKeysByValue(users, DOC_ROLE.EDITOR);
    const viewerIds = getKeysByValue(users, DOC_ROLE.VIEWER);

    const owners = await Promise.all(ownerIds.map(async (id) => {
      const user = await Doc.getEditor(id);
      user.id = id;
      return user;
    }));

    // TODO: more than one owners in the future
    const owner = owners[0];

    const editors = await Promise.all(editorIds.map(async (id) => {
      const user = await Doc.getEditor(id);
      user.id = id;
      return user;
    }));

    const viewers = await Promise.all(viewerIds.map(async (id) => {
      const user = await Doc.getViewer(id);
      user.id = id;
      return user;
    }));

    return { owner, editors, viewers };
  } catch (err) {
    console.log(err);
    return { err };
  }
};

const addUser = async (docId, userEmail, userRole) => {

  if (!userEmail) {
    return {
      status: 400,
      error: 'Request Error: user email is required'
    };
  }
  if (!userRole) {
    return {
      status: 400,
      error: 'Request Error: user role is required'
    };
  }

  const user = await User.getUserDetail(userEmail);
  if (!user) {
    return {
      status: 400,
      error: 'Request Error: user does not exist',
    };
  }

  const userId = user.id;
  if (!userId) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }

  const DBRole = getDBDocRole(userRole);
  if (!DBRole) {
    return {
      status: 400,
      error: 'invalid role',
    };
  }
  if (DBRole === DOC_ROLE.OWNER) {
    return {
      status: 400,
      error: 'cannot add owner to document',
    };
  }

  const result = await Doc.addUser(docId, userId, DBRole);

  return result;
};

const updateUser = async (docId, userId, userRole) => {

    if (!userId) {
      return {
        status: 400,
        error: 'Request Error: user id is required'
      };
    }
    if (!userRole) {
      return {
        status: 400,
        error: 'Request Error: user role is required'
      };
    }

    const DBRole = getDBDocRole(userRole);
    if (!DBRole) {
      return {
        status: 400,
        error: 'invalid role',
      };
    }
    if (DBRole === DOC_ROLE.OWNER) {
      return {
        status: 400,
        error: 'cannot set user an owner to document',
      };
    }

    const result = await Doc.updateUser(docId, userId, DBRole);

    return result;
};

const deleteUser = async (docId, userId) => {

    if (!userId) {
      return {
        status: 400,
        error: 'Request Error: user id is required'
      };
    }

    const user = await Doc.getUser(docId, userId);
    if (!user) {
      return {
        status: 400,
        error: 'Request Error: user is not in document',
      };
    }

    const result = await Doc.deleteUser(docId, userId);

    // Delete document if there is no user left
    const users = await Doc.getUsers(docId);
    if (Object.keys(users).length === 0) {
      await Doc.deleteDoc(docId);
    }

    return result;
};

const getDoc = async (docId) => {
  const result = await Doc.getDoc(docId);
  return result;
};

const createDoc = async (userId, doc) => {
  if (!doc) {
    return {
      status: 400,
      error: 'Request Error: document data is required.'
    };
  }
  const result = await Doc.createDoc(userId, doc);
  return result;
};

const editDoc = async (docId, doc) => {
  if (!doc) {
    return {
      status: 400,
      error: 'Request Error: document data is required.'
    };
  }
  const result = await Doc.editDoc(docId, doc);
  return result;
};

const deleteDoc = async (docId) => {
  const result = await Doc.deleteDoc(docId);
  return result;
};

export {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getDoc,
  createDoc,
  editDoc,
  deleteDoc
};