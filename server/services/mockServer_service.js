import * as DocModel from '../models/doc_model.js';
import Cache from '../../utils/cache.js';

const { CACHE_MOCK_RESPONSE_EXPIRE } = process.env;

async function checkDocBasicInfo(docId, path, method, statusCode, contentType) {
  const doc = await DocModel.getDoc(docId);
  if (!doc) return { code: 60001 };
  if (doc.error) return { code: 10003 };

  const targetPathData = doc.data.paths[path];
  if (!targetPathData) return { code: 60002 };

  const targetMethodData = targetPathData[method];
  if (!targetMethodData) return { code: 60003 };

  const targetStatusCodeData = targetMethodData.responses[statusCode];
  if (!targetStatusCodeData) return { code: 60004 };

  const targetContentTypeData = targetStatusCodeData.content[contentType];
  if (!targetContentTypeData) return { code: 60005 };

  return { code: 0, targetContentTypeData };
}

const getExample = async (docId, path, method, statusCode, contentType) => {
  const cacheMockResKey = `${docId}_${path}_${method}_${statusCode}_${contentType}`;
  let cacheMockResValue;
  try {
    if (Cache.ready) {
      cacheMockResValue = await Cache.get(cacheMockResKey);
      cacheMockResValue = JSON.parse(cacheMockResValue);
    }
  } catch (err) {
    console.error(`Get example mock response from cache error: ${err}`);
  }

  if (cacheMockResValue) {
    console.log('Get example mock response from cache');
    return { data: cacheMockResValue };
  }

  const { code, targetContentTypeData } = await checkDocBasicInfo(
    docId,
    path,
    method,
    statusCode,
    contentType,
  );
  if (code !== 0) {
    return { code };
  }

  const data = targetContentTypeData.example;
  if (!data) return { code: 60006 };

  try {
    if (Cache.ready) {
      await Cache.set(cacheMockResKey, JSON.stringify(data));
      await Cache.expire(cacheMockResKey, CACHE_MOCK_RESPONSE_EXPIRE);
    }
  } catch (err) {
    console.error(`Set example mock response to cache error: ${err}`);
  }

  return { code: 2, data };
};

const getExampleFromExamples = async (
  docId,
  path,
  method,
  statusCode,
  contentType,
  exampleName,
) => {
  const cacheMockResKey = `${docId}_${path}_${method}_${statusCode}_${contentType}_${exampleName}`;
  let cacheMockResValue;
  try {
    if (Cache.ready) {
      cacheMockResValue = await Cache.get(cacheMockResKey);
      cacheMockResValue = JSON.parse(cacheMockResValue);
    }
  } catch (err) {
    console.error(`Get examples mock response from cache error: ${err}`);
  }

  if (cacheMockResValue) {
    console.log('Get examples mock response from cache');
    return { code: 2, data: cacheMockResValue };
  }

  const { code, targetContentTypeData } = await checkDocBasicInfo(
    docId,
    path,
    method,
    statusCode,
    contentType,
  );
  if (code !== 0) {
    return { code };
  }

  const targetExamplesData = targetContentTypeData.examples;
  if (!targetExamplesData) return { code: 61001 };

  const data = targetExamplesData[exampleName];
  if (!data) return { code: 60006 };

  try {
    if (Cache.ready) {
      await Cache.set(cacheMockResKey, JSON.stringify(data));
      await Cache.expire(cacheMockResKey, CACHE_MOCK_RESPONSE_EXPIRE);
    }
  } catch (error) {
    console.error(`Set examples mock response to cache error: ${error}`);
  }

  return { code: 2, data };
};

export {
  getExample,
  getExampleFromExamples,
};
