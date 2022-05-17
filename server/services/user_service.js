import * as User from '../models/user_model.js';
import { signUpSchema, hashPassword, checkPassword } from '../../utils/util.js';
import { QUERY_ERR_MSG } from '../../utils/constants.js';

const nativeSignIn = async (reqBody) => {

  const { email, password } = reqBody;

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

const facebookSignIn = async (reqBody) => {

  const { access_token } = reqBody;

  return {
    status: 400,
    error: {
      code: 32301,
      title: 'facebook sign in fails',
      message: 'facebook sign in is currently under construction',
    }
  };
};

const googleSignIn = async (reqBody) => {

  const { access_token } = reqBody;

  return {
    status: 400,
    error: {
      code: 32301,
      title: 'google sign in fails',
      message: 'google sign in is currently under construction',
    }
  };
};

const signInMap = {
  native: nativeSignIn,
  facebook: facebookSignIn,
  google: googleSignIn,
};

const signUp = async ( name, email, password ) => {

  const validation = signUpSchema.validate({ name, email, password });
  if (validation.error) {
    return {
      status: 400,
      error: {
        code: 31001,
        title: 'sign up fails',
        message: validation.error.message,
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

const signIn = async(reqBody) => {

  const signInFunc = signInMap[reqBody.provider];
  if (!signInFunc) {
    return {
      status: 400,
      error: {
        code: 32001,
        title: 'sign in fails',
        message: 'provider is not supported',
      }
    };
  }

  const signInResult = await signInFunc(reqBody);
  return signInResult;
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