import express from 'express';

import { asyncHandler, authentication, authorizationDoc } from '../../utils/util.js';
import { DOC_ROLE } from '../models/doc_model.js';

import { getDoc, createDoc, editDoc, deleteDoc, getUsers, addUser, deleteUser } from '../controllers/doc_controller.js';

const router = express.Router();

router.route('/:docId/').get(authentication(), authorizationDoc(DOC_ROLE.VIEWER), asyncHandler(getDoc));
router.route('/').post(authentication(), asyncHandler(createDoc));
router.route('/:docId/').put(authentication(), authorizationDoc(DOC_ROLE.EDITOR), asyncHandler(editDoc));
router.route('/:docId/').delete(authentication(), authorizationDoc(DOC_ROLE.EDITOR), asyncHandler(deleteDoc));
router.route('/:docId/users/').get(authentication(), authorizationDoc(DOC_ROLE.VIEWER), asyncHandler(getUsers));
router.route('/:docId/users/').post(authentication(), authorizationDoc(DOC_ROLE.EDITOR), asyncHandler(addUser));
// router.route('/:docId/users/:userId').put(authentication(), authorizationDoc(DOC_ROLE.EDITOR), asyncHandler(addUsers));
router.route('/:docId/users/:userId').delete(authentication(), authorizationDoc(DOC_ROLE.EDITOR), asyncHandler(deleteUser));

export { router };