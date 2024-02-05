const express = require('express');
const router = express.Router();
const auth = require('../../middleware/jwt');
const pushController = require('../../controller/push.controller');



router.post('/v1.0/push/device/token', auth.verifyAccessToken, pushController.addDeviceToken);

router.post('/v1.0/push/msg/group', auth.verifyAccessToken, pushController.pushToGroup);
router.post('/v1.0/push/msg/topic', auth.verifyAccessToken, pushController.pushToTopic);

// router.get('/v1.0/push/history', auth.verifyAccessToken, pushController.getPushHistory);

router.post('/v1.0/push/reservation', pushController.reservationPush); // 푸쉬 예약
router.get('/v1.0/push/reservation', pushController.reservationPushList); // 푸쉬 예약 리스트

module.exports = router;
