import * as Doc from '../models/doc_model.js';

async function checkDocBasicInfo(docId, path, method, statusCode, contentType) {
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
  return targetContentTypeData;
}

const getExample = async (docId, path, method, statusCode, contentType) => {
  const targetContentTypeData = await checkDocBasicInfo(docId, path, method, statusCode, contentType);
  if (targetContentTypeData.error) {
    return targetContentTypeData;
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

const getExampleFromExamples = async (docId, path, method, statusCode, contentType, exampleName) => {
  const targetContentTypeData = await checkDocBasicInfo(docId, path, method, statusCode, contentType);
  if (targetContentTypeData.error) {
    return targetContentTypeData;
  }
  const targetExamplesData = targetContentTypeData.examples;
  if (!targetExamplesData) {
    return {
      status: 400,
      error: 'Request Error: examples is not found.',
    };
  }
  const result = targetExamplesData[exampleName];
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
  getExampleFromExamples,
};