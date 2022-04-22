import * as User from '../models/user_model.js';

const signUp = async ( name, email, password ) => {
  if (!name || !email || !password) {
    return {
      status: 400,
      error: 'Request Error: name, email and password are required.'
    };
  }
  const result = await User.signUp( name, email, password );
  if (result.error) {
    return {
      status: 403,
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
      return { error: 'Request Error: email and password are required.', status: 400 };
  }

  const result = await User.nativeSignIn( email, password );
  if (result.error) {
      return {
        status: 403,
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

export {
  signUp,
  nativeSignIn,
  getDocs
};