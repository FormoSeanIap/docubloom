import 'dotenv/config.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dayjs from 'dayjs';
import { promisify } from 'util';

import * as UserModel from '../server/models/user_model.js';
import * as DocModel from '../server/models/doc_model.js';

import { DOC_ROLE } from './constants.js';
import ResMap from './responses.js';

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

async function modelWrapper(modelFunc, content) {
  try {
    const result = await modelFunc(content);
    return result;
  } catch (err) {
    console.error('error', err);
    return { error: err };
  }
}

function convertMongoId(obj) {
  const newObj = obj;
  newObj.id = obj._id.toHexString();
  delete newObj._id;
  return newObj;
}

function generateResponse(code) {
  const contents = ResMap[code];
  return {
    status: contents.status,
    [contents.type]: {
      code,
      title: contents.title,
      message: contents.message,
    },
  };
}

// TODO: handle duplicate format
function respondPageNotFound(res) {
  const response = generateResponse(10001);
  const { status, error } = response;
  res.status(status).send({ error });
}

function respondServerErr(err, res) {
  console.error(err);
  const response = generateResponse(10002);
  const { status, error } = response;
  res.status(status).send({ error });
}

function respondQueryErr(res) {
  const response = generateResponse(10003);
  const { status, error } = response;
  res.status(status).send({ error });
}

function respondUnauthorized(res) {
  const response = generateResponse(20001);
  const { status, error } = response;
  res.status(status).send({ error });
}

function respondForbidden(res) {
  const response = generateResponse(20002);
  const { status, error } = response;
  res.status(status).send({ error });
}

function handleViewerAuth(userRole, res, next) {
  next();
}

function handleEditorAuth(userRole, res, next) {
  if (userRole === DOC_ROLE.VIEWER) {
    respondForbidden(res);
  } else {
    next();
  }
}

function handleOwnerAuth(userRole, res, next) {
  if (userRole !== DOC_ROLE.OWNER) {
    respondForbidden(res);
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
      respondUnauthorized(res);
      return;
    }

    accessToken = accessToken.replace('Bearer ', '');
    if (accessToken === 'null') {
      respondUnauthorized(res);
      return;
    }

    let user;

    try {
      user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
    } catch (err) {
      respondForbidden(res);
      return;
    }

    const userDetailResult = await UserModel.getUserDetail(user.email);
    if (userDetailResult === null) {
      respondForbidden(res);
      return;
    }
    if (userDetailResult.error) {
      respondQueryErr(res);
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
      const response = generateResponse(50005);
      const { status, error } = response;
      res.status(status).send({ error });
      return;
    }

    const userId = req.user.id;
    const userRoleResult = await DocModel.getDocRole(userId, docId);
    if (userRoleResult.error) generateResponse(10003);

    const userRole = userRoleResult.users[userId];
    req.user.role = userRole;

    const authFunc = authMap[roleType];
    if (!authFunc) {
      const response = generateResponse(50003);
      const { status, error } = response;
      res.status(status).send({ error });
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
  generateResponse,
  respondPageNotFound,
  respondServerErr,
  userAuthentication,
  docAuthorization,
  generateAccessToken,
  hashPassword,
  checkPassword,
  signUpSchema,
};
