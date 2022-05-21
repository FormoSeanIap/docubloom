import * as DocModel from '../models/doc_model.js';
import * as UserModel from '../models/user_model.js';
import Cache from '../../utils/cache.js';

import { DOC_ROLE } from '../../utils/constants.js';
import { getKeysByValue, convertMongoId } from '../../utils/util.js';

function getDBDocRole(role) {
  return DOC_ROLE[role.toUpperCase()];
}

const getOwners = async (ownerIds) => {
  const owners = await Promise.all(ownerIds.map(async (id) => {
    const owner = await DocModel.getOwner(id);
    if (owner.error) return 'error';
    owner.id = id;
    return owner;
  }));
  if (owners.includes('error')) return false;

  return owners;
};

const getEditors = async (editorIds) => {
  const editors = await Promise.all(editorIds.map(async (id) => {
    const editor = await DocModel.getEditor(id);
    if (editor.error) return 'error';
    editor.id = id;
    return editor;
  }));
  if (editors.includes('error')) return false;

  return editors;
};

const getViewers = async (viewerIds) => {
  const viewers = await Promise.all(viewerIds.map(async (id) => {
    const viewer = await DocModel.getViewer(id);
    if (viewer.error) return 'error';
    viewer.id = id;
    return viewer;
  }));
  if (viewers.includes('error')) return false;

  return viewers;
};

const getUsers = async (docId) => {
  const usersResult = await DocModel.getUsers(docId);
  if (usersResult === null || usersResult.error) return { code: 10003 };

  const { users } = usersResult;
  const ownerIds = getKeysByValue(users, DOC_ROLE.OWNER);
  const editorIds = getKeysByValue(users, DOC_ROLE.EDITOR);
  const viewerIds = getKeysByValue(users, DOC_ROLE.VIEWER);

  const owners = await getOwners(ownerIds);
  const editors = await getEditors(editorIds);
  const viewers = await getViewers(viewerIds);
  if (!owners || !editors || !viewers) return { code: 10003 };

  return {
    users: {
      owners,
      editors,
      viewers,
    },
  };
};

const addUser = async (docId, collaboratorEmail, collaboratorRole, userRole) => {
  if (!collaboratorEmail) return { code: 52001 };
  if (!collaboratorRole) return { code: 50002 };

  const collaboratorResult = await UserModel.getUserDetail(collaboratorEmail);
  if (collaboratorResult === null) return { code: 52002 };
  if (collaboratorResult.error) return { code: 10003 };

  const collaborator = convertMongoId(collaboratorResult);
  const collaboratorId = collaborator.id;
  if (!collaboratorId) return { code: 10003 };

  const collaboratorDBRole = getDBDocRole(collaboratorRole);
  if (!collaboratorDBRole) return { code: 50003 };

  /*= =========== editor cannot add others as owner ============ */
  if (userRole === DOC_ROLE.EDITOR && collaboratorDBRole === DOC_ROLE.OWNER) {
    return { code: 52003 };
  }

  const users = await DocModel.getUser(docId, collaboratorId);
  if (users) {
    if (users.error) return { code: 10003 };
    return { code: 52004 };
  }

  const result = await DocModel.addUser(docId, collaboratorId, collaboratorDBRole);
  if (result.error) return { code: 10003 };

  return { code: 1, result };
};

const updateUser = async (docId, userId, collaboratorRole, userRole) => {
  if (!userId) return { code: 50001 };
  if (!collaboratorRole) return { code: 50002 };

  const DBCollaboratorRole = getDBDocRole(collaboratorRole);
  if (!DBCollaboratorRole) return { code: 50003 };

  if (DBCollaboratorRole === DOC_ROLE.OWNER) {
    /*= =========== Only owners can change others' role to owner ============ */
    if (userRole !== DOC_ROLE.OWNER) return { code: 53001 };
  } else {
    const collaboratorResult = await DocModel.getUser(docId, userId);
    if (!collaboratorResult) return { code: 53002 };
    if (collaboratorResult.error) return { code: 10003 };

    const collaboratorOrigin = collaboratorResult.users;
    const collaboratorRoleOrigin = collaboratorOrigin[userId];
    if (collaboratorRoleOrigin === DOC_ROLE.OWNER) {
      if (userRole !== DOC_ROLE.OWNER) {
        /*= =========== Only owners can change an owner's role ============ */
        return { code: 53003 };
      }

      const currentDocUsersResult = await DocModel.getUsers(docId);
      if (currentDocUsersResult === null || currentDocUsersResult.error) {
        return { code: 10003 };
      }

      const { users } = currentDocUsersResult;
      const currentDocOwners = getKeysByValue(users, DOC_ROLE.OWNER);
      if (currentDocOwners.length === 1) return { code: 53004 };
    }
  }

  const result = await DocModel.updateUser(docId, userId, DBCollaboratorRole);
  if (result.error) return { code: 10003 };

  return { code: 3, result };
};

const deleteUser = async (docId, userId) => {
  if (!userId) return { code: 50001 };

  const userResult = await DocModel.getUser(docId, userId);
  if (userResult === null) return { code: 50004 };
  if (userResult.error) return { code: 10003 };

  const user = userResult.users;
  if (user[userId] === DOC_ROLE.OWNER) return { code: 54001 };

  const result = await DocModel.deleteUser(docId, userId);
  if (result.error) return { code: 10003 };

  const usersResult = await DocModel.getUsers(docId);
  if (usersResult === null || usersResult.error) return { code: 10003 };

  const { users } = usersResult;
  // Delete document if there is no user left
  if (Object.keys(users).length === 0) {
    const deleteResult = await DocModel.deleteDoc(docId);
    if (deleteResult.error) return { code: 10003 };
  }

  return { code: 4, result };
};

const getDoc = async (docId) => {
  const doc = await DocModel.getDoc(docId);
  if (doc.error) return { code: 10003 };
  return { code: 2, doc };
};

const createDoc = async (userId, doc) => {
  if (!doc) return { code: 40001 };

  const result = await DocModel.createDoc(userId, doc);
  if (result.error) return { code: 10003 };

  return { code: 1, result };
};

const editDoc = async (docId, doc) => {
  if (!doc) return { code: 40001 };

  const result = await DocModel.editDoc(docId, doc);
  if (result.error) return { code: 10003 };

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
    }
  } catch (err) {
    console.error(`Delete cache keys for doc ${docId} error: ${err}`);
  }

  return { code: 3, result };
};

const deleteDoc = async (docId) => {
  const result = await DocModel.deleteDoc(docId);
  if (result.error) return { code: 10003 };

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
    }
  } catch (err) {
    console.error(`Delete cache keys for doc ${docId} error: ${err}`);
  }

  return { code: 4, result };
};

export {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getDoc,
  createDoc,
  editDoc,
  deleteDoc,
};
