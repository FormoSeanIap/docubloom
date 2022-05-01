import * as User from '../models/user_model.js';
import { hashPassword, checkPassword } from '../../utils/util.js';

const signUp = async ( name, email, password ) => {
  if (!name || !email || !password) {
    return {
      status: 400,
      error: 'Request Error: name, email and password are required.'
    };
  }
  const user = await User.getUserDetail(email);
  if (user) {
    return {
      status: 409,
      error: 'Request Error: email already exists.'
    };
  }

  const hashedPassword = await hashPassword(password);

  const result = await User.signUp( name, email, hashedPassword );
  if (result.error) {
    return {
      status: 500,
      error: result.error
    };
  }
  if (!result.user) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
  }
  return result;
};

const nativeSignIn = async (email, password) => {
  if (!email || !password) {
      return {
        status: 400,
        error: 'Request Error: email and password are required.',
      };
  }

  const user = await User.getUserDetail(email);
  if (!user) {
    return {
      status: 401,
      error: 'Request Error: email or password incorrect.',
    };
  }

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    return {
      status: 401,
      error: 'Request Error: email or password incorrect.',
    };
  }

  const result = await User.nativeSignIn(user);
  if (result.error) {
      return {
        status: 500,
        error: result.error
      };
  }

  if (!result.user) {
      return {
        status: 500,
        error: 'Database Query Error'
      };
  }

  return result;
};

const getDocs = async (userId) => {
  const docs = await User.getUserDocs(userId);
  if(!docs) {
    return {
      status: 500,
      error: 'Database Query Error'
    };
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
  nativeSignIn,
  getDocs,
  getUserDetail
};