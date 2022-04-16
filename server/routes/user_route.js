import express from 'express';

const router = express.Router();

import { asyncHandler, authentication } from '../../utils/main.js';

import { signUp, signIn, getProfile } from '../controllers/user_controller.js';

router.route('/signup/').post(asyncHandler(signUp));
router.route('/signin/').post(asyncHandler(signIn));
router.route('/profile/').get(authentication(), asyncHandler(getProfile));
// router.route('/docs/').get(asyncHandler(getDoc));
// router.route('/docs/').post(asyncHandler(createDoc));

export { router };