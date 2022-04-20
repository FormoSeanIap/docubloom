import express from 'express';

import { asyncHandler, authentication, authorizationDoc, authorizationDoc2 } from '../../utils/util.js';
import { DOC_ROLE } from '../models/user_model.js';

import { getUsers } from '../controllers/doc_controller.js';

const router = express.Router();

router.route('/:docId/users/').get(authentication(), authorizationDoc2(DOC_ROLE.VIEWER), asyncHandler(getUsers));

export { router };