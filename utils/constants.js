const DOC_ROLE = {
  OWNER: 'O',
  EDITOR: 'E',
  VIEWER: 'V',
};

const QUERY_ERR_MSG = {
  GENERAL: {
    status: 500,
    error: {
      code: 10001,
      title: 'query fails',
      message: 'database query error',
    }
  }
};

const AUTH_ERR_MSG = {
  UNAUTHORIZED: {
    status: 401,
    error: {
      code: 20001,
      title: 'unauthorized',
      message: 'user is not authorized',
    }
  },
  FORBIDDEN: {
    status: 403,
    error: {
      code: 20002,
      title: 'forbidden',
      message: 'user is forbidden',
    }
  },
};

export { DOC_ROLE, QUERY_ERR_MSG, AUTH_ERR_MSG };