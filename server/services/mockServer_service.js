import * as Doc from '../models/doc_model.js';

const getExample = async (docId, path, method, statusCode, contentType) => {
  const doc = await Doc.getDoc(docId);
  if (!doc) {
    return {
      status: 400,
      error: 'Request Error: document is not found.',
    };
  }
  const targetPathData = doc.data.paths[path];
  if(!targetPathData) {
    return {
      status: 400,
      error: 'Request Error: path is not found.',
    };
  }
  const targetMethodData = targetPathData[method];
  if(!targetMethodData) {
    return {
      status: 400,
      error: 'Request Error: method is not found.',
    };
  }
  const targetStatusCodeData = targetMethodData.responses[statusCode];
  if(!targetStatusCodeData) {
    return {
      status: 400,
      error: 'Request Error: status code is not found.',
    };
  }
  const targetContentTypeData = targetStatusCodeData.content[contentType];
  if(!targetContentTypeData) {
    return {
      status: 400,
      error: 'Request Error: content type is not found.',
    };
  }
  const result = targetContentTypeData.example;
  if (!result) {
    return {
      status: 400,
      error: 'Request Error: example is not found.',
    };
  }
  return result;
};

export {
  getExample,
};