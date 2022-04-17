import express from 'express';

import { asyncHandler, authentication, authenticationDoc } from '../../utils/util.js';
import { DOC_ROLE } from '../models/user_model.js';

import { signUp, signIn, getProfile, getDoc, createDoc, editDoc } from '../controllers/user_controller.js';

const router = express.Router();

router.route('/signup/').post(asyncHandler(signUp));
router.route('/signin/').post(asyncHandler(signIn));
router.route('/profile/').get(authentication(), asyncHandler(getProfile));
router.route('/docs/').get(authentication(), asyncHandler(getDoc)); // TODO: add get doc role viewer
router.route('/docs/').post(authentication(), asyncHandler(createDoc));
router.route('/docs/').put(authentication(), authenticationDoc(DOC_ROLE.EDITOR), asyncHandler(editDoc));
// router.route('/docs/').delete(authentication(), authenticationDoc(DOC_ROLE.EDITOR), asyncHandler(deleteDoc));

export { router };