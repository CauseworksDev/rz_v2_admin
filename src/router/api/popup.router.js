const express = require('express');
const router = express.Router();
const Controller = require('../../controller/popup.controller');

router.get('/', Controller.getPopupList); // 팝업 이력 확인
router.post('/', Controller.addPopup); // 팝업 등록
router.delete('/', Controller.unActivePopup); // 팝업 상태 관리
router.put('/sort/update', Controller.updatePopupSortInfo); // 팝업 우선순위 변경
router.get('/img', Controller.getPopupImg); // 팝업 이미지 리스트
router.post('/img', Controller.addPopupImg); // 팝업 이미지 등록
router.put('/img', Controller.updatePopupImg); // 팝업 이미지 수정
router.delete('/img', Controller.deletePopupImg); // 팝업 이미지 수정

router.get('/setting', Controller.getPopupSet); // 팝업 이력 확인
router.post('/setting', Controller.addPopupSet); // 팝업 등록




module.exports = router;
