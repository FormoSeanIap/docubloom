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
  50001: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'user id is required',
  },
  50002: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator role is required',
  },
  50003: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator role is invalid',
  },
  50004: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'user is not in document',
  },
  50005: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'doc ID is required',
  },
  52001: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator email is required',
  },
  52002: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator email is not registered',
  },
  52003: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'an editor cannot add others as owner',
  },
  52004: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator is already in document',
  },
  53001: {
    type: 'error',
    status: 403,
    title: 'collaborator management error',
    message: 'only owners can change others\' role to owner',
  },
  53002: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'collaborator is not in document',
  },
  53003: {
    type: 'error',
    status: 403,
    title: 'collaborator management error',
    message: 'only owners can change an owner\'s role',
  },
  53004: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'only one owner left, needs to assign another user as an owner first',
  },
  54001: {
    type: 'error',
    status: 400,
    title: 'collaborator management error',
    message: 'cannot remove owner from a document',
  },
  /*============ mock response error ============*/
  60001: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'document is not found',
  },
  60002: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'path is not found',
  },
  60003: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'method is not found',
  },
  60004: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'status code is not found',
  },
  60005: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'content type is not found',
  },
  60006: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'example is not found',
  },
  61001: {
    type: 'error',
    status: 400,
    title: 'get mock response error',
    message: 'examples is not found',
  },
};

export {
  MAP,
};