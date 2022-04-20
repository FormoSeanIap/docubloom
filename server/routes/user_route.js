import express from 'express';

import { asyncHandler, authentication } from '../../utils/util.js';

import { signUp, signIn, getProfile } from '../controllers/user_controller.js';

const router = express.Router();

router.route('/signup/').post(asyncHandler(signUp));
router.route('/signin/').post(asyncHandler(signIn));
router.route('/profile/').get(authentication(), asyncHandler(getProfile));

export { router };