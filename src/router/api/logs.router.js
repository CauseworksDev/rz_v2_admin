const express = require('express');
const router = express.Router();
const Controller = require('../../controller/logs.controller');


router.post('/', Controller.addLogs); // 해안 쓰래기 수거 정보 등록





module.exports = router;
