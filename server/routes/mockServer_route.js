import express from 'express';

import { asyncHandler } from '../../utils/util.js';
import { getExample, getExampleFromExamples } from '../controllers/mockServer_controller.js';

const router = express.Router();

router.route('/docs/:docId/example').get(asyncHandler(getExample));

router.route('/docs/:docId/examples').get(asyncHandler(getExampleFromExamples));

export { router };

