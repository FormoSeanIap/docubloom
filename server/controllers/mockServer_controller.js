import * as MockServerService from '../services/mockServer_service.js';
import { generateResponse } from '../../utils/util.js';

const getExample = async (req, res) => {
  const { docId } = req.params;
  const {
    path, method, statusCode, contentType,
  } = req.query;

  const { code, data } = await MockServerService.getExample(
    docId,
    path,
    method,
    statusCode,
    contentType,
  );
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  res.status(statusCode).send(data);
};

const getExampleFromExamples = async (req, res) => {
  const { docId } = req.params;
  const {
    path, method, statusCode, contentType, exampleName,
  } = req.query;
  const { code, data } = await MockServerService.getExampleFromExamples(
    docId,
    path,
    method,
    statusCode,
    contentType,
    exampleName,
  );
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  res.status(statusCode).send(data);
};

export {
  getExample,
  getExampleFromExamples,
};
