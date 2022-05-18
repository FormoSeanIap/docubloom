const MAP = {
  /*============ query error ============*/
  10001: {
    type: 'error',
    status: 500,
    title: 'query fails',
    message: 'database query error',
  },
  /*============ auth error ============*/
  20001: {
    type: 'error',
    status: 401,
    title: 'unauthorized',
    message: 'user is not authorized',
  },
  20002: {
    type: 'error',
    status: 403,
    title: 'forbidden',
    message: 'user is forbidden',
  },
  /*============ user error ============*/
  31001: {
    type: 'error',
    status: 400,
    title: 'sign up fails',
    message: 'sign up validation fails', //rule in utils/util.js/signUpSchema
  },
  31002: {
    type: 'error',
    status: 409,
    title: 'sign up fails',
    message: 'user already exists',
  },
  32101: {
    type: 'error',
    status: 400,
    title: 'sign in fails',
    message: 'provider is not supported',
  },
  32201: {
    type: 'error',
    status: 400,
    title: 'native sign in fails',
    message: 'email or password are required',
  },
  32202: {
    type: 'error',
    status: 401,
    title: 'native sign in fails',
    message: 'email or password incorrect',
  },
  32301: {
    type: 'error',
    status: 400,
    title: 'third-party sign-in fails',
    message: 'third-party sign-in is currently under construction',
  },
  /*============ document management error ============*/
  40001: {
    type: 'error',
    status: 400,
    title: 'document management error',
    message: 'document data is required',
  },
  /*============ collaborator management error ============*/
  /*============ mock response error ============*/
};

const controller = async (req, res) => {
  // Raw input
  // input to service
  //output from service
  // call transfer
  // if get method => resp.data = output.data
  // res
};

export {
  MAP,
};