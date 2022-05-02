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

export { DOC_ROLE, QUERY_ERR_MSG };