import 'dotenv/config.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dayjs from 'dayjs';
import { promisify } from 'util';

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

function getKeysByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
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

async function checkAccessToken(token) {
  try {
    return await promisify(jwt.verify)(token, TOKEN_SECRET);
  } catch (err) {
    return false;
  }
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
  getKeysByValue,
  convertMongoId,
  generateAccessToken,
  checkAccessToken,
  hashPassword,
  checkPassword,
  signUpSchema,
};
