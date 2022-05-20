import * as DocModel from '../models/doc_model.js';
import { generateResponse } from '../../utils/util.js';
import Cache from '../../utils/cache.js';

const { CACHE_MOCK_RESPONSE_EXPIRE } = process.env;

async function checkDocBasicInfo(docId, path, method, statusCode, contentType) {
  const doc = await DocModel.getDoc(docId);
  if (!doc) return generateResponse(60001);
  if (doc.error) return generateResponse(10003);

  const targetPathData = doc.data.paths[path];
  if (!targetPathData) return generateResponse(60002);

  const targetMethodData = targetPathData[method];
  if (!targetMethodData) return generateResponse(60003);

  const targetStatusCodeData = targetMethodData.responses[statusCode];
  if (!targetStatusCodeData) return generateResponse(60004);

  const targetContentTypeData = targetStatusCodeData.content[contentType];
  if (!targetContentTypeData) return generateResponse(60005);

  return targetContentTypeData;
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
    return cacheMockResValue;
  }

  const targetContentTypeData = await checkDocBasicInfo(
    docId,
    path,
    method,
    statusCode,
    contentType,
  );
  if (targetContentTypeData.error) {
    return targetContentTypeData;
  }

  const result = targetContentTypeData.example;
  if (!result) return generateResponse(60006);

  try {
    if (Cache.ready) {
      await Cache.set(cacheMockResKey, JSON.stringify(result));
      await Cache.expire(cacheMockResKey, CACHE_MOCK_RESPONSE_EXPIRE);
    }
  } catch (err) {
    console.error(`Set example mock response to cache error: ${err}`);
  }

  return result;
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
    return cacheMockResValue;
  }

  const targetContentTypeData = await checkDocBasicInfo(
    docId,
    path,
    method,
    statusCode,
    contentType,
  );
  if (targetContentTypeData.error) {
    return targetContentTypeData;
  }
  const targetExamplesData = targetContentTypeData.examples;
  if (!targetExamplesData) return generateResponse(61001);

  const result = targetExamplesData[exampleName];
  if (!result) return generateResponse(60006);

  try {
    if (Cache.ready) {
      await Cache.set(cacheMockResKey, JSON.stringify(result));
      await Cache.expire(cacheMockResKey, CACHE_MOCK_RESPONSE_EXPIRE);
    }
  } catch (error) {
    console.error(`Set examples mock response to cache error: ${error}`);
  }

  return result;
};

export {
  getExample,
  getExampleFromExamples,
};
