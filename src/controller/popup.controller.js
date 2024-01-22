const responseCommon = require("../common/response");
const popupService = require("../service/popup.service");
const checkTypes = require('check-types');
const moment = require('moment');

// 팝업 등록 및 수정
addPopup = async (req, res, next) => {
    let result = {}
    let data = {}
    let popupId = (!req.body.popupId) ? "" : parseInt(req.body.popupId);
    let status = (!req.body.status) ? "2" : (req.body.status);
    let sort = (!req.body.sort) ? "" : (req.body.sort);
    let title = (!req.body.title) ? "" : (req.body.title);
    let link = (!req.body.link) ? "" : (req.body.link);

    try {
        //팝업 등록
        const resData = await popupService.addPopup(popupId,status,sort,title,link)

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
// 팝업 상태 수정
unActivePopup = async (req, res, next) => {
    let result = {}
    let data = {}
    let popupId = (!req.body.popupId) ? "" : parseInt(req.body.popupId);
    let status = (!req.body.status) ? "" : (req.body.status);


    try {
        //팝업 상태 변경
        const resData = await popupService.unActivePopup(popupId,status)

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
//팝업 정렬 변경
updatePopupSortInfo = async (req, res, next) => {
    let result = {}
    let data = {}
    let sortInfo = (!req.body.sortInfo) ? "" : (req.body.sortInfo);

    if (checkTypes.object(sortInfo) !== true) {
        responseCommon.sendResponseFail(400, res);
        return false;
    }

    try {
        //정렬 순서 변경
        const resData = await popupService.updatePopupSortInfo(sortInfo)

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
// 팝업 삭제
deletePopup = async (req, res, next) => {

    let result = {}
    let data = {}
    let styleId = (!req.body.styleId) ? "" : parseInt(req.body.styleId);

    try {
        //상품 삭제
        const resData = await popupService.deleteRevisionStyle(styleId)

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
// 팝업 리스트
getPopupList = async (req, res, next) => {

    let result = {}
    let data = {}
    let popupId = (!req.query.popupId) ? "" : (req.query.popupId);
    let title = (!req.query.title) ? "" : (req.query.title);
    let status = (!req.query.status) ? "" : (req.query.status);

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //팝업 리스트
        const resData = await popupService.getPopupList(popupId,title,status,numOfRows,offset)

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
// 팝업 이미지 리스트
getPopupImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let popupId = (!req.query.popupId) ? "" : (req.query.popupId);

    try {
        //팝업 리스트
        const resData = await popupService.getPopupImg(popupId)

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
// 팝업 이미지 추가
addPopupImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let popupId = req.body.popupId;
    let media = req.body.media;
    media = (typeof media === 'string') ? JSON.parse(media) : media;

    try {
        //상품 스타일 등록
        const resData = await popupService.addPopupImg(popupId, media)

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
// 팝업 이미지 수정
updatePopupImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let popupId = req.body.popupId;
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
            await popupService.updatePopupMediaMainclear(popupId,type)
        }

        await popupService.updatePopupMedia(popupId, arraySerialNo, type)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            popupId : popupId
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
// 팝업 이미지 수정
deletePopupImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let popupId = req.body.popupId;
    let serialNo = req.body.serialNo;
    let arraySerialNo = '';


    try {


        await popupService.deletePopupMedia(popupId, serialNo)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            popupId : popupId
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
        //팝업 리스트
        const resData = await popupService.getEmartList()

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

// 팝업 셋팅 정보
getPopupSet = async (req, res, next) => {

    let result = {}
    let data = {}

    try {
        //팝업 리스트
        const resData = await popupService.getPopupSet()
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
// 팝업 셋팅
addPopupSet = async (req, res, next) => {

    let result = {}
    let data = {}
    let active = req.body.active
    try {
        //팝업 리스트
        const resData = await popupService.addPopupSet(active)

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
    addPopup,
    unActivePopup,
    updatePopupSortInfo,
    deletePopup,
    getPopupList,
    getPopupImg,
    addPopupImg,
    updatePopupImg,
    deletePopupImg,
    getPopupSet,
    addPopupSet,



}
