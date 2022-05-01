import 'dotenv/config';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import * as User from '../server/models/user_model.js';
import * as Doc from '../server/models/doc_model.js';

import { DOC_ROLE } from './constants.js';

const { TOKEN_SECRET } = process.env;

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

function authentication() {
  return async function (req, res, next) {
      let accessToken = req.get('Authorization');
      if (!accessToken) {
          res.status(401).send({ error: 'Unauthorized' });
          return;
      }

      accessToken = accessToken.replace('Bearer ', '');
      if (accessToken == 'null') {
          res.status(401).send({ error: 'Unauthorized' });
          return;
      }

      try {
        const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
        req.user = user;

        const userDetail = await User.getUserDetail(user.email);
          if (!userDetail) {
            res.status(403).send({ error: 'Forbidden' });
          } else {
              req.user.id = userDetail.id;
              req.user.role_id = userDetail.role_id;
              next();
          }
          return;
      } catch (err) {
          res.status(403).send({ error: 'Forbidden' });
          return;
      }
  };
}

function authorizationDoc(roleType) {
  return async function (req, res, next) {

    const { docId } = req.params;
      if (!docId) {
          res.status(400).send({ error: 'doc id is required' });
          return;
      }

      const userId = req.user.id;
      const userRole = await Doc.getDocRole(userId, docId);

      if (!userRole) {
        res.status(403).send({ error: 'Forbidden' });
        return;
      }
      req.user.role= userRole;

      switch (roleType) {
        case DOC_ROLE.VIEWER:
          next();
          break;
        case DOC_ROLE.EDITOR:
          if (userRole === DOC_ROLE.VIEWER) {
            res.status(403).send({ error: 'Forbidden' });
            return;
          } else {
            next();
          }
          break;
        case DOC_ROLE.OWNER:
          if (userRole !== DOC_ROLE.OWNER) {
            res.status(403).send({ error: 'Forbidden' });
            return;
          } else {
            next();
          }
          break;
        default:
          res.status(400).send({ error: 'invalid role' });
          break;
      }
  };
}

async function hashPassword(password) {
  return await argon2.hash(password);
}

async function checkPassword(password, hash) {
  return await argon2.verify(hash, password);
}

export {
  asyncHandler,
  authentication,
  authorizationDoc,
  hashPassword,
  checkPassword,
};