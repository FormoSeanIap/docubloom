import * as UserModel from '../models/user_model.js';
import {
  signUpSchema,
  hashPassword,
  checkPassword,
  convertMongoId,
  getCurrentTime,
} from '../../utils/util.js';

const nativeSignIn = async (reqBody) => {
  const { email, password } = reqBody;

  if (!email || !password) return { code: 32201 };

  const userRaw = await UserModel.getUserDetailByEmail(email);
  if (userRaw === null) return { code: 32202 };
  if (userRaw.error) return { code: 10003 };
  const user = convertMongoId(userRaw);

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) return { code: 32202 };

  const loginAt = getCurrentTime();
  const updateDt = getCurrentTime();

  const signInResult = await UserModel.nativeSignIn(userRaw, loginAt, updateDt);
  if (signInResult.error) return { code: 10003 };

  return {
    code: 11,
    user: {
      ...user,
      login_at: loginAt,
    },
  };
};

const facebookSignIn = async (reqBody) => {
  // eslint-disable-next-line no-unused-vars
  const { access_token: accessToken } = reqBody;

  return { code: 32301 };
};

const googleSignIn = async (reqBody) => {
  // eslint-disable-next-line no-unused-vars
  const { access_token: accessToken } = reqBody;

  return { code: 32301 };
};

const signInMap = {
  native: nativeSignIn,
  facebook: facebookSignIn,
  google: googleSignIn,
};

const signUp = async (name, email, password) => {
  if (!name || !email || !password) return { code: 31003 };

  try {
    await signUpSchema.validateAsync({ name, email, password });
  } catch (err) {
    return { code: 31001 };
  }

  const userResult = await UserModel.getUserDetailByEmail(email);
  if (userResult !== null) return { code: 31002 };
  if (userResult && userResult.error) return { code: 10003 };

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

  const result = await UserModel.signUp(user);
  if (result.error) return { code: 10003 };

  return {
    code: 10,
    user: {
      ...user,
      id: result.insertedId.toHexString(),
    },
  };
};

const signIn = async (reqBody) => {
  const signInFunc = signInMap[reqBody.provider];
  if (!signInFunc) return { code: 32101 };

  const signInResult = await signInFunc(reqBody);
  return signInResult;
};

const getDocs = async (userId) => {
  const docs = await UserModel.getUserDocs(userId);
  if (!docs || docs.error) return { code: 10003 };

  return { code: 2, docs };
};

const getUserDetail = async (email) => {
  const userResult = await UserModel.getUserDetailByEmail(email);
  if (userResult.error) return { code: 10003 };

  const userDetail = convertMongoId(userResult);
  return { code: 2, userDetail };
};

export {
  signUp,
  signIn,
  nativeSignIn,
  getDocs,
  getUserDetail,
};
