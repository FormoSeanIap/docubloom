import * as User from '../models/user_model.js';
import { hashPassword, checkPassword } from '../../utils/util.js';
import { QUERY_ERR_MSG } from '../../utils/constants.js';

const signUp = async ( name, email, password ) => {
  if (!name || !email || !password) {
    return {
      status: 400,
      error: {
        code: 31001,
        title: 'sign up fails',
        message: 'name, email and password are required',
      }
    };
  }
  const user = await User.getUserDetail(email);
  if (user) {
    return {
      status: 409,
      error: {
        code: 31002,
        title: 'sign up fails',
        message: 'user already exists',
      }
    };
  }

  const hashedPassword = await hashPassword(password);

  const result = await User.signUp( name, email, hashedPassword );
  if (result.error || !result.user) {
    return QUERY_ERR_MSG.GENERAL;
  }

  return result;
};

const signIn = async(data) => {
  let result;
  switch (data.provider) {
    case 'native':
      result = await nativeSignIn(data.email, data.password);
      break;
    case 'facebook':
      result = { error: 'Facebook signIn is currently under construction' };
      // result = await facebookSignIn(data.access_token);
      break;
    case 'google':
      result = { error: 'Google signIn is currently under construction' };
      // result = await googleSignIn(data.access_token);
      break;
    default:
      result = {
        error: {
          code: 32101,
          title: 'sign in fails',
          message: 'provider is not supported',
        }
      };
  }
  return result;
};

const nativeSignIn = async (email, password) => {
  if (!email || !password) {
      return {
        status: 400,
        error: {
          code: 32201,
          title: 'native sign in fails',
          message: 'email and password are required',
        }
      };
  }

  const user = await User.getUserDetail(email);
  if (!user) {
    return {
      status: 401,
      error: {
        code: 32202,
        title: 'native sign in fails',
        message: 'email or password incorrect',
      }
    };
  }

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    return {
      status: 401,
      error: {
        code: 32202,
        title: 'native sign in fails',
        message: 'email or password incorrect',
      }
    };
  }

  const result = await User.nativeSignIn(user);
  if (result.error || !result.user) {
      return QUERY_ERR_MSG.GENERAL;
  }

  return result;
};

const getDocs = async (userId) => {
  const docs = await User.getUserDocs(userId);
  if(!docs) {
    return QUERY_ERR_MSG.GENERAL;
  }
  return docs;
};

const getUserDetail = async (email) => {
  const user = await User.getUserDetail(email);
  if (!user) {
    return {
      status: 400,
      error: 'Request Error: user does not exist',
    };
  }
  return user;
};

export {
  signUp,
  signIn,
  nativeSignIn,
  getDocs,
  getUserDetail
};