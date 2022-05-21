import handleResponse from './response_handler.js';
import { DOC_ROLE } from './constants.js';
import { checkAccessToken, convertMongoId } from './util.js';

import * as UserModel from '../server/models/user_model.js';
import * as DocModel from '../server/models/doc_model.js';

function handleViewerAuth(userRole, res, next) {
  next();
}

function handleEditorAuth(userRole, res, next) {
  if (userRole === DOC_ROLE.VIEWER) {
    handleResponse(20002, res);
  } else {
    next();
  }
}

function handleOwnerAuth(userRole, res, next) {
  if (userRole !== DOC_ROLE.OWNER) {
    handleResponse(20002, res);
  } else {
    next();
  }
}

const authMap = {
  [DOC_ROLE.VIEWER]: handleViewerAuth,
  [DOC_ROLE.EDITOR]: handleEditorAuth,
  [DOC_ROLE.OWNER]: handleOwnerAuth,
};

function userAuthentication() {
  return async (req, res, next) => {
    let accessToken = req.get('Authorization');
    if (!accessToken) {
      handleResponse(20001, res);
      return;
    }

    accessToken = accessToken.replace('Bearer ', '');
    if (accessToken === 'null') {
      handleResponse(20001, res);
      return;
    }

    const user = await checkAccessToken(accessToken);
    if (!user) {
      handleResponse(20002, res);
      return;
    }

    const userDetailResult = await UserModel.getUserDetailByEmail(user.email);
    if (userDetailResult === null) {
      handleResponse(20002, res);
      return;
    }
    if (userDetailResult.error) {
      handleResponse(10003, res);
      return;
    }

    const userDetail = convertMongoId(userDetailResult);

    req.user = user;
    req.user.id = userDetail.id;
    req.user.role_id = userDetail.role_id;
    next();
  };
}

function docAuthorization(roleType) {
  return async (req, res, next) => {
    const { docId } = req.params;
    if (!docId) {
      handleResponse(50005, res);
      return;
    }

    const userId = req.user.id;
    const userRoleResult = await DocModel.getDocRole(userId, docId);
    if (userRoleResult.error) {
      handleResponse(10003, res);
      return;
    }

    const userRole = userRoleResult.users[userId];
    req.user.role = userRole;

    const authFunc = authMap[roleType];
    if (!authFunc) {
      handleResponse(50003, res);
      return;
    }
    authFunc(userRole, res, next);
  };
}

export {
  userAuthentication,
  docAuthorization,
};
