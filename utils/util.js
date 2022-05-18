import 'dotenv/config.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { promisify } from 'util';

import * as User from '../server/models/user_model.js';
import * as Doc from '../server/models/doc_model.js';

import { DOC_ROLE } from './constants.js';
import * as Response from './responses.js';

const { TOKEN_SECRET } = process.env;

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

function generateResponse(code) {
  const contents = Response.MAP[code];
  return {
    status: contents.status,
    [contents.type]: {
      code,
      title: contents.title,
      message: contents.message,
    },
  };
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
  return async function (req, res, next) {
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

    try {
      const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
      req.user = user;

      const userDetail = await User.getUserDetail(user.email);
      if (!userDetail) {
        respondForbidden(res);
        return;
      }
      req.user.id = userDetail.id;
      req.user.role_id = userDetail.role_id;
      next();

      return;
    } catch (err) {
      respondForbidden(res);
    }
  };
}

function docAuthorization(roleType) {
  return async function (req, res, next) {
    const { docId } = req.params;
    if (!docId) {
      const response = generateResponse(50005);
      const { status, error } = response;
      res.status(status).send({ error });
      return;
    }

    const userId = req.user.id;
    const userRole = await Doc.getDocRole(userId, docId);
    if (!userRole) {
      respondForbidden(res);
      return;
    }
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
  asyncHandler,
  generateResponse,
  userAuthentication,
  docAuthorization,
  hashPassword,
  checkPassword,
  signUpSchema,
};
