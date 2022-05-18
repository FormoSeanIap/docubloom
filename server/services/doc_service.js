import * as Doc from '../models/doc_model.js';
import * as User from '../models/user_model.js';
import Cache from '../../utils/cache.js';

import { DOC_ROLE } from '../../utils/constants.js';
import { generateResponse } from '../../utils/util.js';

function getDBDocRole(role) {
  return DOC_ROLE[role.toUpperCase()];
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value);
}

const getUsers = async (docId) => {
  const users = await Doc.getUsers(docId);
  if (!users) {
    return generateResponse(10001);
  }

  const ownerIds = getKeysByValue(users, DOC_ROLE.OWNER);
  const editorIds = getKeysByValue(users, DOC_ROLE.EDITOR);
  const viewerIds = getKeysByValue(users, DOC_ROLE.VIEWER);

  // TODO: how to do error handling here?
  const owners = await Promise.all(ownerIds.map(async (id) => {
    const user = await Doc.getEditor(id);
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

  if (!collaboratorEmail) {
    return {
      status: 400,
      error: {
        code: 52001,
        title: 'collaborator management error',
        message: 'collaborator email is required'
      }
    };
  }
  if (!collaboratorRole) {
    return {
      status: 400,
      error: {
        code: 50002,
        title: 'collaborator management error',
        message: 'collaborator role is required'
      }
    };
  }

  const collaborator = await User.getUserDetail(collaboratorEmail);
  if (!collaborator) {
    return {
      status: 400,
      error: {
        code: 52002,
        title: 'collaborator management error',
        message: 'collaborator email is not registered'
      }
    };
  }

  const collaboratorId = collaborator.id;
  if (!collaboratorId) {
    return generateResponse(10001);
  }

  const collaboratorDBRole = getDBDocRole(collaboratorRole);
  if (!collaboratorDBRole) {
    return {
      status: 400,
      error: {
        code: 50003,
        title: 'collaborator management error',
        message: 'collaborator role is invalid'
      }
    };
  }

  /*============ editor cannot add others as owner ============*/
  if (userRole === DOC_ROLE.EDITOR && collaboratorDBRole === DOC_ROLE.OWNER) {
    return {
      status: 400,
      error: {
        code: 52003,
        title: 'collaborator management error',
        message: 'an editor cannot add others as owner'
      }
    };
  }

  const user = await Doc.getUser(docId, collaboratorId);
  if (user) {
    return {
      status: 400,
      error: {
        code: 52004,
        title: 'collaborator management error',
        message: 'collaborator is already in document'
      }
    };
  }

  const result = await Doc.addUser(docId, collaboratorId, collaboratorDBRole);
  if (result.error) {
    return generateResponse(10001);
  }

  return result;
};

const updateUser = async (docId, userId, collaboratorRole, userRole) => {

    if (!userId) {
      return {
        status: 400,
        error: {
          code: 50001,
          title: 'collaborator management error',
          message: 'user id is required'
        }
      };
    }
    if (!collaboratorRole) {
      return {
        status: 400,
        error: {
          code: 50002,
          title: 'collaborator management error',
          message: 'collaborator role is required'
        }
      };
    }

    const DBCollaboratorRole = getDBDocRole(collaboratorRole);
    if (!DBCollaboratorRole) {
      return {
        status: 400,
        error: {
          code: 50003,
          title: 'collaborator management error',
          message: 'collaborator role is invalid'
        }
      };
    }

    if (DBCollaboratorRole === DOC_ROLE.OWNER) {
      /*============ Only owners can change others' role to owner ============*/
      if (userRole !== DOC_ROLE.OWNER) {
        return {
          status: 403,
          error: {
            code: 53001,
            title: 'collaborator management error',
            message: 'only owners can change others\' role to owner'
          }
        };
      }
    } else {
      const collaboratorOrigin = await Doc.getUser(docId, userId);
      if (!collaboratorOrigin) {
        return {
          status: 400,
          error: {
            code: 53002,
            title: 'collaborator management error',
            message: 'collaborator is not in document'
          }
        };
      }
      const collaboratorRoleOrigin = collaboratorOrigin[userId];
      if (collaboratorRoleOrigin === DOC_ROLE.OWNER) {
        if (userRole !== DOC_ROLE.OWNER) {
          /*============ Only owners can change an owner's role ============*/
          return {
            status: 403,
            error: {
              code: 53003,
              title: 'collaborator management error',
              message: 'only owners can change an owner\'s role'
            }
          };
        } else {
          const currentDocUsers = await Doc.getUsers(docId);
          const currentDocOwners = getKeysByValue(currentDocUsers, DOC_ROLE.OWNER);
          if (currentDocOwners.length === 1) {
            /*============ There must be at least one owner to a document ============*/
            return {
              status: 400,
              error: {
                code: 53004,
                title: 'collaborator management error',
                message: 'only one owner left, needs to assign another user as an owner first',
              }
            };
          }
        }
      }
    }

    const result = await Doc.updateUser(docId, userId, DBCollaboratorRole);
    if (result.error) {
      return generateResponse(10001);
    }

    return result;
};

const deleteUser = async (docId, userId) => {

    if (!userId) {
      return {
        status: 400,
        error: {
          code: 50001,
          title: 'collaborator management error',
          message: 'user id is required'
        }
      };
    }

    const user = await Doc.getUser(docId, userId);
    if (!user) {
      return {
        status: 400,
        error: {
          code: 50004,
          title: 'collaborator management error',
          message: 'user is not in document'
        }
      };
    }
    if (user[userId] === DOC_ROLE.OWNER) {
      return {
        status: 400,
        error: {
          code: 54001,
          title: 'collaborator management error',
          message: 'cannot remove owner from a document'
        }
      };
    }

    const result = await Doc.deleteUser(docId, userId);
    if (result.error) {
      return generateResponse(10001);
    }

    // Delete document if there is no user left
    const users = await Doc.getUsers(docId);
    if (Object.keys(users).length === 0) {
      const deleteResult = await Doc.deleteDoc(docId);
      if (deleteResult.error) {
        return generateResponse(10001);
      }
    }

    return result;
};

const getDoc = async (docId) => {
  const result = await Doc.getDoc(docId);
  return result;
};

const createDoc = async (userId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await Doc.createDoc(userId, doc);
  if (result.error) return generateResponse(10001);
  return result;
};

const editDoc = async (docId, doc) => {
  if (!doc) return generateResponse(40001);

  const result = await Doc.editDoc(docId, doc);
  if (result.error) return generateResponse(10001);

  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      for (let i = 0; i < docCacheKeys.length; i++) {
        await Cache.del(docCacheKeys[i]);
      }
    }
  } catch (error) {
    console.error(`Delete cache keys for doc ${docId} error: ${error}`);
  }

  return result;
};

const deleteDoc = async (docId) => {
  const result = await Doc.deleteDoc(docId);
  if (result.error) {
    return generateResponse(10001);
  }

  try {
    if (Cache.ready) {
      const docCacheKeys = await Cache.keys(`${docId}*`);
      for (let i = 0; i < docCacheKeys.length; i++) {
        await Cache.del(docCacheKeys[i]);
      }
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
  deleteDoc
};