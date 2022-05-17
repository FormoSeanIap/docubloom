import express from 'express';

import { asyncHandler, userAuthentication, docAuthorization } from '../../utils/util.js';
import { DOC_ROLE } from '../../utils/constants.js';

import { getDoc, createDoc, editDoc, deleteDoc, getUsers, addUser, updateUser, deleteUser } from '../controllers/doc_controller.js';

const router = express.Router();

router.route('/:docId/').get(userAuthentication(), docAuthorization(DOC_ROLE.VIEWER), asyncHandler(getDoc));
router.route('/').post(userAuthentication(), asyncHandler(createDoc));
router.route('/:docId/').put(userAuthentication(), docAuthorization(DOC_ROLE.EDITOR), asyncHandler(editDoc));
router.route('/:docId/').delete(userAuthentication(), docAuthorization(DOC_ROLE.OWNER), asyncHandler(deleteDoc));
router.route('/:docId/users/').get(userAuthentication(), docAuthorization(DOC_ROLE.VIEWER), asyncHandler(getUsers));
router.route('/:docId/users/').post(userAuthentication(), docAuthorization(DOC_ROLE.EDITOR), asyncHandler(addUser));
router.route('/:docId/users/:userId').put(userAuthentication(), docAuthorization(DOC_ROLE.EDITOR), asyncHandler(updateUser));
router.route('/:docId/users/:userId').delete(userAuthentication(), docAuthorization(DOC_ROLE.OWNER), asyncHandler(deleteUser));

export { router };