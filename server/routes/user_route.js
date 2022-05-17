import express from 'express';

import { asyncHandler, userAuthentication } from '../../utils/util.js';

import { signUp, signIn, getProfile, leaveDoc } from '../controllers/user_controller.js';

const router = express.Router();

router.route('/signup/').post(asyncHandler(signUp));
router.route('/signin/').post(asyncHandler(signIn));
router.route('/profile/').get(userAuthentication(), asyncHandler(getProfile));
router.route('/self/docs/:docId').delete(userAuthentication(), asyncHandler(leaveDoc));

export { router };