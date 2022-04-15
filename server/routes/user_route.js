import express from 'express';

const router = express.Router();

import { asyncHandler } from '../../utils/main.js';

import { signUp } from '../controllers/user_controller.js';

router.route('/user/signup/').post(asyncHandler(signUp));
// router.route('/user/signin/').post(asyncHandler(getDoc));
// router.route('/user/profile/').get(asyncHandler(getDoc));
// router.route('/user/docs/').get(asyncHandler(getDoc));
// router.route('/user/docs/').post(asyncHandler(createDoc));

export { router };