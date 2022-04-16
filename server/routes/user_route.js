import express from 'express';

const router = express.Router();

import { asyncHandler } from '../../utils/main.js';

import { signUp } from '../controllers/user_controller.js';

router.route('/signup/').post(asyncHandler(signUp));
// router.route('/signin/').post(asyncHandler(getDoc));
// router.route('/profile/').get(asyncHandler(getDoc));
// router.route('/docs/').get(asyncHandler(getDoc));
// router.route('/docs/').post(asyncHandler(createDoc));

export { router };