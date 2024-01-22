const express = require('express');
const router = express.Router();
const contentController = require('../../controller/content.controller');

router.get('/', contentController.getContentList); // 컨텐츠 이력 확인
router.post('/', contentController.addContent); // 컨텐츠 등록
router.delete('/', contentController.unActiveContent); // 컨텐츠 활성관리
router.put('/sort/update', contentController.updateContentSortInfo); // 컨텐츠 우선순위 변경
router.get('/img', contentController.getContentImg); // 컨텐츠 이미지 리스트
router.post('/img', contentController.addContentImg); // 컨텐츠 이미지 등록
router.put('/img', contentController.updateContentImg); // 컨텐츠 이미지 수정
router.delete('/img', contentController.deleteContentImg); // 컨텐츠 이미지 삭제

router.get('/month', contentController.getMonthContentList); // 이달의 바다 이미지 관리 확인
router.post('/month', contentController.addMonthContent); // 이달의 바다 등록
router.delete('/month', contentController.unActiveMonthContent); // 이달의 바다 활성관리
router.put('/month/sort/update', contentController.updateMonthContentSortInfo); // 이달의 바다 우선순위 변경
router.get('/month/img', contentController.getMonthContentImg); // 이달의 바다 이미지 리스트
router.post('/month/img', contentController.addMonthContentImg); // 이달의 바다 이미지 등록
router.put('/month/img', contentController.updateMonthContentImg); // 이달의 바다 이미지 수정
router.delete('/month/img', contentController.deleteMonthContentImg); // 이달의 바다 이미지 삭제

router.post('/month/link', contentController.addMonthLink); // 이달의 바다 플로팅 버튼 설정 등록
router.get('/month/link', contentController.getMonthLink); // 이달의 바다 플로팅 버튼 설정 정보 호출

router.get('/emart/store', contentController.getEmartList); // 이마트 정보 확인




module.exports = router;
