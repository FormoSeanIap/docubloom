/* eslint-disable no-undef */
import { requester } from './set_up.js';

after(() => {
  requester.close();
});
