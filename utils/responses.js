const MAP = {
  10001: {
    type: 'error',
    status: 500,
    title: 'query fails',
    message: 'database query error',
  },
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
  }
};

const result = 32202; // service return only code

// util
const transfer = (statusObj) => {};
// input obj => output resp including status {status, resp}

// const {status, resp} = transfer(origin);

// resp.status(status).json(resp);

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