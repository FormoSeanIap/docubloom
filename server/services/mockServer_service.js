import * as Doc from '../models/doc_model.js';

async function checkDocBasicInfo(docId, path, method, statusCode, contentType) {
  const doc = await Doc.getDoc(docId);
  if (!doc) {
    return {
      status: 400,
      error: {
        code: 60001,
        title: 'get mock response error',
        message: 'document is not found',
      }
    };
  }
  const targetPathData = doc.data.paths[path];
  if(!targetPathData) {
    return {
      status: 400,
      error: {
        code: 60002,
        title: 'get mock response error',
        message: 'path is not found',
      }
    };
  }
  const targetMethodData = targetPathData[method];
  if(!targetMethodData) {
    return {
      status: 400,
      error: {
        code: 60003,
        title: 'get mock response error',
        message: 'method is not found',
      }
    };
  }
  const targetStatusCodeData = targetMethodData.responses[statusCode];
  if(!targetStatusCodeData) {
    return {
      status: 400,
      error: {
        code: 60004,
        title: 'get mock response error',
        message: 'status code is not found',
      }
    };
  }
  const targetContentTypeData = targetStatusCodeData.content[contentType];
  if(!targetContentTypeData) {
    return {
      status: 400,
      error: {
        code: 60005,
        title: 'get mock response error',
        message: 'content type is not found',
      }
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
      error: {
        code: 60006,
        title: 'get mock response error',
        message: 'example is not found',
      }
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
      error: {
        code: 61001,
        title: 'get mock response error',
        message: 'examples is not found',
      }
    };
  }
  const result = targetExamplesData[exampleName];
  if (!result) {
    return {
      status: 400,
      error: {
        code: 60006,
        title: 'get mock response error',
        message: 'example is not found',
      }
    };
  }
  return result;
};

export {
  getExample,
  getExampleFromExamples,
};