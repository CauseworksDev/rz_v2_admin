const responseCommon = require("../common/response");
const bannerService = require("../service/banner.service");
const checkTypes = require('check-types');
const moment = require('moment');

// 배너 등록 및 수정
addBanner = async (req, res, next) => {
    // console.log(req.body)
    let result = {}
    let data = {}
    let bannerId = (!req.body.bannerId) ? "" : parseInt(req.body.bannerId);
    let status = (!req.body.status) ? "" : (req.body.status);
    let sort = (!req.body.sort) ? "" : (req.body.sort);
    let title = (!req.body.title) ? "" : (req.body.title);
    let link = (!req.body.link) ? "" : (req.body.link);

    try {
        //배너 등록
        const resData = await bannerService.addBanner(bannerId,status,sort,title,link)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 비활성
unActiveBanner = async (req, res, next) => {
    // console.log(req.body)
    let result = {}
    let data = {}
    let bannerId = (!req.body.bannerId) ? "" : (req.body.bannerId);
    let status = (!req.body.status) ? "2" : (req.body.status);

    try {
        //배너 등록
        const resData = await bannerService.unActiveBanner(bannerId,status)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
//배너 정렬 변경
updateBannerSortInfo = async (req, res, next) => {
    // console.log(req.body)
    let result = {}
    let data = {}
    let sortInfo = (!req.body.sortInfo) ? "" : (req.body.sortInfo);

    if (checkTypes.object(sortInfo) !== true) {
        responseCommon.sendResponseFail(400, res);
        return false;
    }

    try {
        //정렬 순서 변경
        const resData = await bannerService.updateBannerSortInfo(sortInfo)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);

    }

}
// 배너 삭제
deleteBanner = async (req, res, next) => {

    let result = {}
    let data = {}
    let styleId = (!req.body.styleId) ? "" : parseInt(req.body.styleId);

    try {
        //상품 삭제
        const resData = await bannerService.deleteRevisionStyle(styleId)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('deleteRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 리스트
getBannerList = async (req, res, next) => {

    let result = {}
    let data = {}
    let bannerId = (!req.query.bannerId) ? "" : (req.query.bannerId);
    let title = (!req.query.title) ? "" : (req.query.title);
    let status = (!req.query.status) ? "" : (req.query.status);

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //배너 리스트
        const resData = await bannerService.getBannerList(bannerId,title,status,numOfRows,offset)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            totalCount : resData.totalCount,
            items:resData.items,
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('getRevisionStyleList:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 이미지 리스트
getBannerImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let bannerId = (!req.query.bannerId) ? "" : (req.query.bannerId);

    try {
        //배너 리스트
        const resData = await bannerService.getBannerImg(bannerId)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            totalCount : resData.totalCount,
            items:resData.items,
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('getRevisionStyleList:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 이미지 추가
addBannerImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let bannerId = req.body.bannerId;
    let media = req.body.media;
    media = (typeof media === 'string') ? JSON.parse(media) : media;

    try {
        //상품 스타일 등록
        const resData = await bannerService.addBannerImg(bannerId, media)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 이미지 수정
updateBannerImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let bannerId = req.body.bannerId;
    let serialNo = req.body.serialNo;
    let type = (!req.body.type) ? "0" : (req.body.type);
    let arraySerialNo = '';
    serialNo = (typeof serialNo === 'object') ? serialNo : JSON.parse(serialNo);

    arraySerialNo = `\"${serialNo[0]}\"`;

    for (let i = 1; i < serialNo.length; i++) {
        arraySerialNo += ',' + `\"${serialNo[i]}\"`;
    }

    try {
        //메인 클리어
        if (type !== '0') {
            await bannerService.updateBannerMediaMainclear(bannerId,type)
        }

        await bannerService.updateBannerMedia(bannerId, arraySerialNo, type)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            bannerId : bannerId
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 이미지 수정
deleteBannerImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let bannerId = req.body.bannerId;
    let serialNo = req.body.serialNo;
    let arraySerialNo = '';


    try {


        await bannerService.deleteBannerMedia(bannerId, serialNo)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            bannerId : bannerId
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('postRevisionStyle:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}

// 이마트 리스트
getEmartList = async (req, res, next) => {

    let result = {}
    let data = {}

    try {
        //배너 리스트
        const resData = await bannerService.getEmartList()

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            totalCount : resData.items.length,
            items:resData.items,
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('getRevisionStyleList:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}

// 배너 셋팅 정보
getBannerSet = async (req, res, next) => {

    let result = {}
    let data = {}

    try {
        //배너 리스트
        const resData = await bannerService.getBannerSet()
        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData[0];
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('getRevisionStyleList:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 배너 셋팅
addBannerSet = async (req, res, next) => {

    let result = {}
    let data = {}
    let active = req.body.active
    let top = req.body.top
    let bottom = req.body.bottom
    try {
        //배너 리스트
        const resData = await bannerService.addBannerSet(active,top,bottom)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            totalCount : resData.totalCount,
            items:resData.items,
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('getRevisionStyleList:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
module.exports = {
    addBanner,
    unActiveBanner,
    updateBannerSortInfo,
    deleteBanner,
    getBannerList,
    getBannerImg,
    addBannerImg,
    updateBannerImg,
    deleteBannerImg,
    getBannerSet,
    addBannerSet,



}
