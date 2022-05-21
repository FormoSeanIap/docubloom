import 'dotenv/config.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dayjs from 'dayjs';
import { promisify } from 'util';

import * as UserModel from '../server/models/user_model.js';
import * as DocModel from '../server/models/doc_model.js';

import { DOC_ROLE } from './constants.js';
import handleResponse from './response_handler.js';

const { TOKEN_SECRET, TOKEN_EXPIRE } = process.env;

function getCurrentTime() {
  return dayjs().format();
}

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}

function convertMongoId(obj) {
  const newObj = obj;
  newObj.id = obj._id.toHexString();
  delete newObj._id;
  return newObj;
}

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

    let user;

    try {
      user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
    } catch (err) {
      handleResponse(20002, res);
      return;
    }

    const userDetailResult = await UserModel.getUserDetail(user.email);
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

async function generateAccessToken(user) {
  const accessToken = await promisify(jwt.sign)(
    user,
    TOKEN_SECRET,
    { expiresIn: TOKEN_EXPIRE },
  );
  return {
    accessToken,
    accTokenExp: TOKEN_EXPIRE,
  };
}

async function hashPassword(password) {
  const hashResult = await argon2.hash(password);
  return hashResult;
}

async function checkPassword(password, hash) {
  const verifyResult = await argon2.verify(hash, password);
  return verifyResult;
}

const signUpSchema = Joi.object({
  name: [
    Joi.string().min(1).required(),
    Joi.number().min(1).required(),
  ],
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(4).max(30),
});

export {
  getCurrentTime,
  asyncHandler,
  convertMongoId,
  userAuthentication,
  docAuthorization,
  generateAccessToken,
  hashPassword,
  checkPassword,
  signUpSchema,
};
