import * as DocModel from '../models/doc_model.js';
import * as UserModel from '../models/user_model.js';
import Cache from '../../utils/cache.js';

import { DOC_ROLE } from '../../utils/constants.js';
import { generateResponse, convertMongoId } from '../../utils/util.js';

// TODO: move getDBDocRole & getKeysBeValue to utils
function getDBDocRole(role) {
  return DOC_ROLE[role.toUpperCase()];
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}

const getUsers = async (docId) => {
  const usersResult = await DocModel.getUsers(docId);
  if (usersResult === null || usersResult.error) return generateResponse(10003);

  const { users } = usersResult;
  const ownerIds = getKeysByValue(users, DOC_ROLE.OWNER);
  const editorIds = getKeysByValue(users, DOC_ROLE.EDITOR);
  const viewerIds = getKeysByValue(users, DOC_ROLE.VIEWER);

  const owners = await Promise.all(ownerIds.map(async (id) => {
    const user = await DocModel.getOwner(id);
    if (user.error) return 'error';
    user.id = id;
    return user;
  }));
  if (owners.includes('error')) return generateResponse(10003);

  const editors = await Promise.all(editorIds.map(async (id) => {
    const user = await DocModel.getEditor(id);
    if (user.error) return 'error';
    user.id = id;
    return user;
  }));
  if (editors.includes('error')) return generateResponse(10003);

  const viewers = await Promise.all(viewerIds.map(async (id) => {
    const user = await DocModel.getViewer(id);
    if (user.error) return 'error';
    user.id = id;
    return user;
  }));
  if (viewers.includes('error')) return generateResponse(10003);

  return {
    owners,
    editors,
    viewers,
  };
};

const addUser = async (docId, collaboratorEmail, collaboratorRole, userRole) => {
  if (!collaboratorEmail) return generateResponse(52001);
  if (!collaboratorRole) return generateResponse(50002);

  const collaboratorResult = await UserModel.getUserDetail(collaboratorEmail);
  if (collaboratorResult === null) return generateResponse(52002);
  if (collaboratorResult.error) return generateResponse(10003);

  const collaborator = convertMongoId(collaboratorResult);
  const collaboratorId = collaborator.id;
  if (!collaboratorId) return generateResponse(10003);

  const collaboratorDBRole = getDBDocRole(collaboratorRole);
  if (!collaboratorDBRole) return generateResponse(50003);

  /*= =========== editor cannot add others as owner ============ */
  if (userRole === DOC_ROLE.EDITOR && collaboratorDBRole === DOC_ROLE.OWNER) {
    return generateResponse(52003);
  }

  const users = await DocModel.getUser(docId, collaboratorId);
  if (users) {
    if (users.error) return generateResponse(10003);
    return generateResponse(52004);
  }

  const result = await DocModel.addUser(docId, collaboratorId, collaboratorDBRole);
  if (result.error) return generateResponse(10003);

  return result;
};

const updateUser = async (docId, userId, collaboratorRole, userRole) => {
  if (!userId) return generateResponse(50001);
  if (!collaboratorRole) return generateResponse(50002);

  const DBCollaboratorRole = getDBDocRole(collaboratorRole);
  if (!DBCollaboratorRole) return generateResponse(50003);

  if (DBCollaboratorRole === DOC_ROLE.OWNER) {
    /*= =========== Only owners can change others' role to owner ============ */
    if (userRole !== DOC_ROLE.OWNER) return generateResponse(53001);
  } else {
    const collaboratorResult = await DocModel.getUser(docId, userId);
    if (!collaboratorResult) return generateResponse(53002);
    if (collaboratorResult.error) return generateResponse(10003);

    const collaboratorOrigin = collaboratorResult.users;
    const collaboratorRoleOrigin = collaboratorOrigin[userId];
    if (collaboratorRoleOrigin === DOC_ROLE.OWNER) {
      if (userRole !== DOC_ROLE.OWNER) {
        /*= =========== Only owners can change an owner's role ============ */
        return generateResponse(53003);
      }

      const currentDocUsersResult = await DocModel.getUsers(docId);
      if (currentDocUsersResult === null || currentDocUsersResult.error) {
        return generateResponse(10003);
      }

      const { users } = currentDocUsersResult;
      const currentDocOwners = getKeysByValue(users, DOC_ROLE.OWNER);
      if (currentDocOwners.length === 1) return generateResponse(53004);
    }
  }

  const result = await DocModel.updateUser(docId, userId, DBCollaboratorRole);
  if (result.error) return generateResponse(10003);

  return result;
};

const deleteUser = async (docId, userId) => {
  if (!userId) return generateResponse(50001);

  const userResult = await DocModel.getUser(docId, userId);
  if (userResult === null) return generateResponse(50004);
  if (userResult.error) return generateResponse(10003);

  const user = userResult.users;
  if (user[userId] === DOC_ROLE.OWNER) return generateResponse(54001);

  const result = await DocModel.deleteUser(docId, userId);
  if (result.error) return generateResponse(10003);

  const usersResult = await DocModel.getUsers(docId);
  if (usersResult === null || usersResult.error) return generateResponse(10003);

  const { users } = usersResult;
  // Delete document if there is no user left
  if (Object.keys(users).length === 0) {
    const deleteResult = await DocModel.deleteDoc(docId);
    if (deleteResult.error) return generateResponse(10003);
  }

  return result;
};

const getDoc = async (docId) => {
  const doc = await DocModel.getDoc(docId);
  if (doc.error) return generateResponse(10003);
  return doc;
};

const createDoc = async (userId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await DocModel.createDoc(userId, doc);
  if (result.error) return generateResponse(10003);
  return result;
};

const editDoc = async (docId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await DocModel.editDoc(docId, doc);
  if (result.error) return generateResponse(10003);

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
    }
  } catch (err) {
    console.error(`Delete cache keys for doc ${docId} error: ${err}`);
  }

  return result;
};

const deleteDoc = async (docId) => {
  const result = await DocModel.deleteDoc(docId);
  if (result.error) return generateResponse(10003);

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
    }
  } catch (err) {
    console.error(`Delete cache keys for doc ${docId} error: ${err}`);
  }

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
  deleteDoc,
};
