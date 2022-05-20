/* eslint-disable no-undef */
import 'dotenv/config.js';
import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import chaiHttp from 'chai-http';
import app from '../app.js';
import { truncateFakeData, createFakeData } from './fake_data_generator.js';

const { NODE_ENV } = process.env;

chai.use(chaiHttp);
chai.use(deepEqualInAnyOrder);
chai.should();

const { assert } = chai;
const { expect } = chai;
const requester = chai.request(app).keepOpen();

before(async () => {
  if (NODE_ENV !== 'test') {
    console.log('automation test only runs in test env');
    return;
  }
  await truncateFakeData();
  await createFakeData();
});

export {
  assert, expect, requester,
};
