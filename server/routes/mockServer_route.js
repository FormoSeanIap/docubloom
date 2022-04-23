import express from 'express';

import { asyncHandler, authentication, authorizationDoc } from '../../utils/util.js';
import { getExample, getExampleFromExamples } from '../controllers/mockServer_controller.js';

import { DOC_ROLE } from '../../utils/constants.js';

const router = express.Router();

router.route('/docs/:docId/example')
  .get(authentication(), authorizationDoc(DOC_ROLE.VIEWER), asyncHandler(getExample));

router.route('/docs/:docId/examples')
  .get(authentication(), authorizationDoc(DOC_ROLE.VIEWER), asyncHandler(getExampleFromExamples));

export { router };

