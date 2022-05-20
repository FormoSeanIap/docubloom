import * as Doc from '../models/doc_model.js';
import * as User from '../models/user_model.js';
import Cache from '../../utils/cache.js';

import { DOC_ROLE } from '../../utils/constants.js';
import { generateResponse, convertMongoId } from '../../utils/util.js';

function getDBDocRole(role) {
  return DOC_ROLE[role.toUpperCase()];
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}

const getUsers = async (docId) => {
  const usersResult = await Doc.getUsers(docId);
  if (usersResult === null || usersResult.error) return generateResponse(10003);

  const { users } = usersResult;
  const ownerIds = getKeysByValue(users, DOC_ROLE.OWNER);
  const editorIds = getKeysByValue(users, DOC_ROLE.EDITOR);
  const viewerIds = getKeysByValue(users, DOC_ROLE.VIEWER);

  // TODO: how to do error handling here?
  const owners = await Promise.all(ownerIds.map(async (id) => {
    const user = await Doc.getOwner(id);
    user.id = id;
    return user;
  }));

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

  return { owners, editors, viewers };
};

const addUser = async (docId, collaboratorEmail, collaboratorRole, userRole) => {
  if (!collaboratorEmail) return generateResponse(52001);
  if (!collaboratorRole) return generateResponse(50002);

  const collaboratorResult = await User.getUserDetail(collaboratorEmail);
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

  const users = await Doc.getUser(docId, collaboratorId);
  if (users) {
    if (users.error) return generateResponse(10003);
    return generateResponse(52004);
  }

  const result = await Doc.addUser(docId, collaboratorId, collaboratorDBRole);
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
    const collaboratorResult = await Doc.getUser(docId, userId);
    if (!collaboratorResult) return generateResponse(53002);
    if (collaboratorResult.error) return generateResponse(10003);

    const collaboratorOrigin = collaboratorResult.users;
    const collaboratorRoleOrigin = collaboratorOrigin[userId];
    if (collaboratorRoleOrigin === DOC_ROLE.OWNER) {
      if (userRole !== DOC_ROLE.OWNER) {
        /*= =========== Only owners can change an owner's role ============ */
        return generateResponse(53003);
      }

      const currentDocUsersResult = await Doc.getUsers(docId);
      if (currentDocUsersResult === null || currentDocUsersResult.error) {
        return generateResponse(10003);
      }

      const { users } = currentDocUsersResult;
      const currentDocOwners = getKeysByValue(users, DOC_ROLE.OWNER);
      if (currentDocOwners.length === 1) return generateResponse(53004);
    }
  }

  const result = await Doc.updateUser(docId, userId, DBCollaboratorRole);
  if (result.error) return generateResponse(10003);

  return result;
};

const deleteUser = async (docId, userId) => {
  if (!userId) return generateResponse(50001);

  const userResult = await Doc.getUser(docId, userId);
  if (userResult === null) return generateResponse(50004);
  if (userResult.error) return generateResponse(10003);

  const user = userResult.users;
  if (user[userId] === DOC_ROLE.OWNER) return generateResponse(54001);

  const result = await Doc.deleteUser(docId, userId);
  if (result.error) return generateResponse(10003);

  const usersResult = await Doc.getUsers(docId);
  if (usersResult === null || usersResult.error) return generateResponse(10003);

  const { users } = usersResult;
  // Delete document if there is no user left
  if (Object.keys(users).length === 0) {
    const deleteResult = await Doc.deleteDoc(docId);
    if (deleteResult.error) return generateResponse(10003);
  }

  return result;
};

const getDoc = async (docId) => {
  const doc = await Doc.getDoc(docId);
  if (doc.error) return generateResponse(10003);
  return doc;
};

const createDoc = async (userId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await Doc.createDoc(userId, doc);
  if (result.error) return generateResponse(10003);
  return result;
};

const editDoc = async (docId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await Doc.editDoc(docId, doc);
  if (result.error) return generateResponse(10003);

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
      // for (const key of docCacheKeys) {
      //   await Cache.del(key);
      // }
      // for (let i = 0; i < docCacheKeys.length; i++) {
      //   await Cache.del(docCacheKeys[i]);
      // }
    }
  } catch (error) {
    console.error(`Delete cache keys for doc ${docId} error: ${error}`);
  }

  return result;
};

const deleteDoc = async (docId) => {
  const result = await Doc.deleteDoc(docId);
  if (result.error) return generateResponse(10003);

  // Delete mock response cache
  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      await Promise.all(docCacheKeys.map((key) => Cache.del(key)));
      // for (let i = 0; i < docCacheKeys.length; i++) {
      //   await Cache.del(docCacheKeys[i]);
      // }
    }
  } catch (error) {
    console.error(`Delete cache keys for doc ${docId} error: ${error}`);
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
