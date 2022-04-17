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

export {
  asyncHandler,
  authentication,
}