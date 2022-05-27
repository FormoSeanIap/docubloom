import * as MockServerService from '../services/mockServer_service.js';
import handleResponse from '../../utils/response_handler.js';

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
    handleResponse(code, res);
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
    handleResponse(code, res);
    return;
  }
  res.status(statusCode).send(data);
};

export {
  getExample,
  getExampleFromExamples,
};
