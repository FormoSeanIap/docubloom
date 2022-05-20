import * as User from '../models/user_model.js';
import {
  signUpSchema,
  hashPassword,
  checkPassword,
  generateResponse,
  convertMongoId,
  generateAccessToken,
  getCurrentTime,
} from '../../utils/util.js';
import { DOC_ROLE } from '../../utils/constants.js';

const nativeSignIn = async (reqBody) => {
  const { email, password } = reqBody;

  if (!email || !password) return generateResponse(32201);

  const userRaw = await User.getUserDetail(email);
  if (userRaw === null) return generateResponse(32202);
  if (userRaw.error) return generateResponse(10003);
  const user = convertMongoId(userRaw);

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) return generateResponse(32202);

  const loginAt = getCurrentTime();
  const updateDt = getCurrentTime();

  const signInResult = await User.nativeSignIn(userRaw, loginAt, updateDt);
  if (signInResult.error) return generateResponse(10003);

  const { accessToken, accTokenExp } = await generateAccessToken({
    provider: 'native',
    name: user.name,
    email: user.email,
  });

  const signedInUser = {
    user: {
      ...user,
      access_token: accessToken,
      access_expired: accTokenExp,
      login_at: loginAt,
    },
  };

  return signedInUser;
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
  if (!name || !email || !password) return generateResponse(31003);

  try {
    await signUpSchema.validateAsync({ name, email, password });
  } catch (err) {
    return generateResponse(31001);
  }

  const userCheck = await User.getUserDetail(email);
  if (userCheck !== null) return generateResponse(31002);
  if (userCheck && userCheck.error) return generateResponse(10003);

  const hashedPassword = await hashPassword(password);

  const loginAt = getCurrentTime();
  const createdDt = getCurrentTime();
  const updatedDt = getCurrentTime();

  const user = {
    provider: 'native',
    email,
    password: hashedPassword,
    name,
    last_login_at: loginAt,
    created_dt: createdDt,
    updated_dt: updatedDt,
  };

  const result = await User.signUp(user);
  if (result.error) return generateResponse(10003);

  const { accessToken, accTokenExp } = await generateAccessToken({
    provider: 'native',
    name: user.name,
    email: user.email,
  });

  user.access_token = accessToken;
  user.access_expired = accTokenExp;
  user.id = result.insertedId.toHexString();

  return { user };
};

const signIn = async (reqBody) => {
  const signInFunc = signInMap[reqBody.provider];
  if (!signInFunc) return generateResponse(32101);

  const signInResult = await signInFunc(reqBody);
  return signInResult;
};

const getDocs = async (userId) => {
  const rawDocs = await User.getUserDocs(userId);
  if (!rawDocs || rawDocs.error) return generateResponse(10003);

  const docs = rawDocs.map((info) => {
    const newInfo = { ...info };

    newInfo.id = info._id.toHexString();
    delete newInfo._id;

    newInfo.role = Object.keys(DOC_ROLE)
      .find((key) => DOC_ROLE[key] === info.users[userId])
      .toLowerCase();
    delete newInfo.users;

    if (info.data && info.data.info) {
      newInfo.info = info.data.info;
    } else {
      newInfo.info = '';
    }

    if (info.data && info.data.openapi) {
      newInfo.openapi = info.data.openapi;
    } else {
      newInfo.openapi = '';
    }
    delete newInfo.data;

    return newInfo;
  });

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
