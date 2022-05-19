import * as User from '../models/user_model.js';
import {
  signUpSchema, hashPassword, checkPassword, generateResponse, convertMongoId,
} from '../../utils/util.js';

const nativeSignIn = async (reqBody) => {
  const { email, password } = reqBody;

  if (!email || !password) return generateResponse(32201);

  const userCheck = await User.getUserDetail(email);
  if (userCheck === null) return generateResponse(32202);
  if (userCheck.error) return generateResponse(10003);
  const user = convertMongoId(userCheck);

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) return generateResponse(32202);

  const result = await User.nativeSignIn(userCheck);
  if (result.error || !result.user) return generateResponse(10003);

  return result;
};

const facebookSignIn = async (reqBody) => {
  // eslint-disable-next-line no-unused-vars
  const { access_token: accessToken } = reqBody;

  return generateResponse(32301);
};

const googleSignIn = async (reqBody) => {
  // eslint-disable-next-line no-unused-vars
  const { access_token: accessToken } = reqBody;

  return generateResponse(32301);
};

const signInMap = {
  native: nativeSignIn,
  facebook: facebookSignIn,
  google: googleSignIn,
};

const signUp = async (name, email, password) => {
  const validation = signUpSchema.validate({ name, email, password });
  if (validation.error) return generateResponse(31001);

  const userCheck = await User.getUserDetail(email);
  if (userCheck !== null) return generateResponse(31002);
  if (userCheck && userCheck.error) return generateResponse(10003);

  const hashedPassword = await hashPassword(password);

  const result = await User.signUp(name, email, hashedPassword);
  if (result.error || !result.user) return generateResponse(10003);

  return result;
};

const signIn = async (reqBody) => {
  const signInFunc = signInMap[reqBody.provider];
  if (!signInFunc) return generateResponse(32101);

  const signInResult = await signInFunc(reqBody);
  return signInResult;
};

const getDocs = async (userId) => {
  const docs = await User.getUserDocs(userId);
  if (!docs) return generateResponse(10003);

  return docs;
};

const getUserDetail = async (email) => {
  const userCheck = await User.getUserDetail(email);
  if (userCheck.error) return generateResponse(10003);
  const userDetail = convertMongoId(userCheck);
  return userDetail;
};

export {
  signUp,
  signIn,
  nativeSignIn,
  getDocs,
  getUserDetail,
};
