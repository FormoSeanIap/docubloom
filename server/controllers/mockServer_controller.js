import * as MockServerService from '../services/mockServer_service.js';

const getExample = async (req, res) => {
  const { docId } = req.params;
  const {
    path, method, statusCode, contentType,
  } = req.query;
  const result = await MockServerService.getExample(docId, path, method, statusCode, contentType);

  if (result.error) {
    const resultCode = result.status ? result.status : 403;
    res.status(resultCode).send({ error: result.error });
    return;
  }
  res.status(statusCode).send(result);
};

const getExampleFromExamples = async (req, res) => {
  const { docId } = req.params;
  const {
    path, method, statusCode, contentType, exampleName,
  } = req.query;
  const result = await MockServerService.getExampleFromExamples(
    docId,
    path,
    method,
    statusCode,
    contentType,
    exampleName,
  );

  if (result.error) {
    const resultCode = result.status ? result.status : 403;
    res.status(resultCode).send({ error: result.error });
    return;
  }
  res.status(statusCode).send(result);
};

export {
  getExample,
  getExampleFromExamples,
};
