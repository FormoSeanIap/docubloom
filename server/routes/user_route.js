import express from 'express';

const router = express.Router();

import { asyncHandler, authentication } from '../../utils/util.js';

import { signUp, signIn, getProfile, getDoc, createDoc } from '../controllers/user_controller.js';

router.route('/signup/').post(asyncHandler(signUp));
router.route('/signin/').post(asyncHandler(signIn));
router.route('/profile/').get(authentication(), asyncHandler(getProfile));
router.route('/docs/').get(authentication(), asyncHandler(getDoc));
router.route('/docs/').post(authentication(), asyncHandler(createDoc));
// router.route('/docs/').put(authentication(), asyncHandler(editDoc));
// router.route('/docs/').delete(authentication(), asyncHandler(deleteDoc));

export { router };