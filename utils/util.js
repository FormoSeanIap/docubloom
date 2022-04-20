import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { promisify } from 'util'; 

import * as User from '../server/models/user_model.js';

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
};

function authorizationDoc(roleType) {
  return async function (req, res, next) {

      const docId = req.query.id;
      if (!docId) {
          res.status(400).send({ error: 'doc id is required' });
          return;
      }

      const userId = req.user.id;
      const userRole = await User.getDocRole(userId, docId);

      if (!userRole) {
        res.status(403).send({ error: 'Forbidden' });
        return;
      }

      if (roleType === User.DOC_ROLE.VIEWER) {
        next();
      } else if (roleType === User.DOC_ROLE.EDITOR && userRole === User.DOC_ROLE.VIEWER) {
        res.status(403).send({ error: 'Forbidden' });
        return;
        } else {
          next();
        }
      }
  };

function authorizationDoc2(roleType) {
  return async function (req, res, next) {

      const { docId } = req.params;

      if (!docId) {
          res.status(400).send({ error: 'doc id is required' });
          return;
      }

      const userId = req.user.id;
      const userRole = await User.getDocRole(userId, docId);

      if (!userRole) {
        res.status(403).send({ error: 'Forbidden' });
        return;
      }

      if (roleType === User.DOC_ROLE.VIEWER) {
        next();
      } else if (roleType === User.DOC_ROLE.EDITOR && userRole === User.DOC_ROLE.VIEWER) {
        res.status(403).send({ error: 'Forbidden' });
        return;
        } else {
          next();
        }
      }
  };


export {
  asyncHandler,
  authentication,
  authorizationDoc,
  authorizationDoc2,
}