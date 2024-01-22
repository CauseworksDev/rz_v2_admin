const express = require('express');
const router = express.Router();
const bannerController = require('../../controller/banner.controller');

router.get('/', bannerController.getBannerList); // 배너 이력 확인
router.post('/', bannerController.addBanner); // 배너 등록
router.delete('/', bannerController.unActiveBanner); // 배너 활성관리
router.put('/sort/update', bannerController.updateBannerSortInfo); // 배너 우선순위 변경
router.get('/img', bannerController.getBannerImg); // 배너 이미지 리스트
router.post('/img', bannerController.addBannerImg); // 배너 이미지 등록
router.put('/img', bannerController.updateBannerImg); // 배너 이미지 수정
router.delete('/img', bannerController.deleteBannerImg); // 배너 이미지 수정

router.get('/setting', bannerController.getBannerSet); // 배너 이력 확인
router.post('/setting', bannerController.addBannerSet); // 배너 등록




module.exports = router;
