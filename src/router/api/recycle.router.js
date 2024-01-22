const express = require('express');
const router = express.Router();
const Controller = require('../../controller/recycle.controller');

router.get('/', Controller.getRecycleList); // 해안 쓰래기 수거 정보 이력 확인
router.get('/total', Controller.getRecycleTotal); //해안 쓰래기 수거 통계 정보 확인
router.post('/', Controller.addRecycle); // 해안 쓰래기 수거 정보 등록
router.delete('/', Controller.deleteRecycle); //해안 쓰래기 수거 정보 삭제


router.get('/pet', Controller.getRecyclePetList); // 플라스틱 수거 정보 이력 확인
router.post('/pet', Controller.addRecyclePet); // 플라스틱 수거 정보 등록



module.exports = router;
