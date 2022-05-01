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
  const users = await Doc.getUsers(docId);
  if (!users) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
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
      error: 'Request Error: user email is required'
    };
  }
  if (!collaboratorRole) {
    return {
      status: 400,
      error: 'Request Error: user role is required'
    };
  }

  const collaborator = await User.getUserDetail(collaboratorEmail);
  if (!collaborator) {
    return {
      status: 400,
      error: 'Request Error: user does not exist',
    };
  }

  const collaboratorId = collaborator.id;
  if (!collaboratorId) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }

  const collaboratorDBRole = getDBDocRole(collaboratorRole);
  if (!collaboratorDBRole) {
    return {
      status: 400,
      error: 'invalid role',
    };
  }

  /*============ editor cannot add others as owner ============*/
  if (userRole === DOC_ROLE.EDITOR && collaboratorDBRole === DOC_ROLE.OWNER) {
    return {
      status: 400,
      error: 'an editor cannot add owner to document',
    };
  }

  const user = await Doc.getUser(docId, collaboratorId);
  if (user) {
    return {
      status: 400,
      error: 'user already exists',
    };
  }

  const result = await Doc.addUser(docId, collaboratorId, collaboratorDBRole);
  if (result.error) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }

  return result;
};

const updateUser = async (docId, userId, collaboratorRole, userRole) => {

    if (!userId) {
      return {
        status: 400,
        error: 'Request Error: user id is required'
      };
    }
    if (!collaboratorRole) {
      return {
        status: 400,
        error: 'Request Error: user role is required'
      };
    }

    const DBCollaboratorRole = getDBDocRole(collaboratorRole);
    if (!DBCollaboratorRole) {
      return {
        status: 400,
        error: 'invalid role',
      };
    }

    if (DBCollaboratorRole === DOC_ROLE.OWNER && userRole !== DOC_ROLE.OWNER) {
      /*============ Only owners can change others' role to owner ============*/
      return {
        status: 403,
        error: 'only the owner can set a user as an owner to document',
      };
    } else if (DBCollaboratorRole === DOC_ROLE.EDITOR || DBCollaboratorRole === DOC_ROLE.VIEWER) {
      const collaboratorOrigin = await Doc.getUser(docId, userId);
      if (!collaboratorOrigin) {
        return {
          status: 400,
          error: 'Request Error: user is not in document',
        };
      }
      const collaboratorRoleOrigin = collaboratorOrigin[userId];
      if (collaboratorRoleOrigin === DOC_ROLE.OWNER) {
        if (userRole !== DOC_ROLE.OWNER) {
          /*============ Only owners can change others' role to owner ============*/
          return {
            status: 403,
            error: 'only the owner can set another user as an owner to document',
          };
        } else {
          const currentDocUsers = await Doc.getUsers(docId);
          const currentDocOwners = getKeysByValue(currentDocUsers, DOC_ROLE.OWNER);
          if (currentDocOwners.length === 1) {
            /*============ There must be at least one owner to a document ============*/
            return {
              status: 400,
              error: 'only one owner left, needs to assign another user as an owner first',
            };
          }
        }
      }
    }

    const result = await Doc.updateUser(docId, userId, DBCollaboratorRole);
    if (result.error) {
      return {
        status: 500,
        error: 'Database Query Error'
      };
    }

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
    if (user[userId] === DOC_ROLE.OWNER) {
      return {
        status: 400,
        error: 'Request Error: cannot remove owner from a document',
      };
    }

    const result = await Doc.deleteUser(docId, userId);
    if (result.error) {
      return {
        status: 500,
        error: 'Database Query Error'
      };
    }

    // Delete document if there is no user left
    const users = await Doc.getUsers(docId);
    if (Object.keys(users).length === 0) {
      const deleteResult = await Doc.deleteDoc(docId);
      if (deleteResult.error) {
        return {
          status: 500,
          error: 'Database Query Error'
        };
      }
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
  if (result.error) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }
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
  if (result.error) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }
  return result;
};

const deleteDoc = async (docId) => {
  const result = await Doc.deleteDoc(docId);
  if (result.error) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
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