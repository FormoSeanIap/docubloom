const router = require('express').Router();
const { asyncHandler } = require('../../utils/main');

const { getDoc, createDoc } = require('../controllers/user_controller');

router.route('/user/docs/').get(asyncHandler(getDoc));
router.route('/user/docs/').post(asyncHandler(createDoc));

module.exports = router;