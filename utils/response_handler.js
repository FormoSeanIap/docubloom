import ResMap from './response_map.js';

function generateResData(code) {
  const contents = ResMap[code];
  return {
    status: contents.status,
    type: contents.type,
    message: {
      code,
      title: contents.title,
      message: contents.message,
    },
  };
}

function handleResponse(code, res) {
  const { status, type, message } = generateResData(code);
  res.status(status).send({ [type]: message });
}

export default handleResponse;
