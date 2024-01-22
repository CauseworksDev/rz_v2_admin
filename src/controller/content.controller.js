const responseCommon = require("../common/response");
const contentService = require("../service/content.service");
const requestContent = require('../request/content.request');
const checkTypes = require('check-types');
const moment = require('moment');
let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',

};
let entityMap2 = {
    '&amp;': '&;',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '='

};
function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}
function inHtml(string) {
    let change = string
    change = change.replace(/&amp;/gi, '&');
    change = change.replace(/&lt;/gi, '<');
    change = change.replace(/&gt;/gi, '>');
    change = change.replace(/&quot;/gi, '"');
    change = change.replace(/&#39;/gi, "'");
    change = change.replace(/&#x2F;/gi, '/');
    change = change.replace(/&#x60;/gi, '`');
    change = change.replace(/&#x3D;/gi, '=');
    change = change.replace(/\\/gi, '');

    return change

}
// 컨텐츠 등록 및 수정
addContent = async (req, res, next) => {
    let result = {}
    let data = {}
    let contentId = (!req.body.contentId) ? "" : parseInt(req.body.contentId);
    let status = (!req.body.status) ? "" : (req.body.status);
    let sort = (!req.body.sort) ? "" : (req.body.sort);
    let type = (!req.body.type) ? "" : (req.body.type);
    let category = (!req.body.category) ? "" : (req.body.category);
    let isTop = (!req.body.isTop) ? "" : (req.body.isTop);
    let title = (!req.body.title) ? "" : escapeHtml(req.body.title);
    let contentText = (!req.body.contentText) ? "" : escapeHtml(req.body.contentText);
    let link = (!req.body.link) ? "" : (req.body.link);

    try {
        //컨텐츠 등록
        const resData = await contentService.addContent(contentId,status,sort,type,category,isTop,title,contentText,link)

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
// 컨텐츠 상태 관리
unActiveContent = async (req, res, next) => {
    // console.log(req.body)
    let result = {}
    let data = {}
    let contentId = (!req.body.contentId) ? "" : (req.body.contentId);
    let status = (!req.body.status) ? "2" : (req.body.status);

    try {
        // 컨텐츠 상태 관리
        const resData = await contentService.unActiveContent(contentId,status)

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

// 이달의 바다 컨텐츠 관리
addMonthContent = async (req, res, next) => {
    let result = {}
    let data = {}
    let contentId = (!req.body.contentId) ? "" : parseInt(req.body.contentId);
    let status = (!req.body.status) ? "" : (req.body.status);
    let sort = (!req.body.sort) ? "" : (req.body.sort);
    let isTop = (!req.body.isTop) ? "" : (req.body.isTop);
    let title = (!req.body.title) ? "" : (req.body.title);


    try {
        //컨텐츠 등록
        const resData = await contentService.addMonthContent(contentId,status,sort,isTop,title,)

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
// 이달의 바다 상태 관리
unActiveMonthContent = async (req, res, next) => {
    let result = {}
    let data = {}
    let contentId = (!req.body.contentId) ? "" : (req.body.contentId);
    let status = (!req.body.status) ? "2" : (req.body.status);

    try {
        // 이달의 바다 상태 관리
        const resData = await contentService.unActiveMonthContent(contentId,status)

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
//컨텐츠 정렬 변경
updateContentSortInfo = async (req, res, next) => {
    let result = {}
    let data = {}
    let sortInfo = (!req.body.sortInfo) ? "" : (req.body.sortInfo);

    if (checkTypes.object(sortInfo) !== true) {
        responseCommon.sendResponseFail(400, res);
        return false;
    }

    try {
        //정렬 순서 변경
        const resData = await contentService.updateContentSortInfo(sortInfo)

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
//이달의 바다 정렬 변경
updateMonthContentSortInfo = async (req, res, next) => {
    let result = {}
    let data = {}
    let sortInfo = (!req.body.sortInfo) ? "" : (req.body.sortInfo);

    if (checkTypes.object(sortInfo) !== true) {
        responseCommon.sendResponseFail(400, res);
        return false;
    }

    try {
        //정렬 순서 변경
        const resData = await contentService.updateMonthContentSortInfo(sortInfo)

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

// 컨텐츠 리스트
getContentList = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = (!req.query.contentId) ? "" : (req.query.contentId);
    let title = (!req.query.title) ? "" : (req.query.title);
    let type = (!req.query.type) ? "" : (req.query.type);
    let status = (!req.query.status) ? "" : (req.query.status);

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //컨텐츠 리스트
        const resData = await contentService.getContentList(contentId,title,type,status,numOfRows,offset)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        resData.items.forEach(function (element){
            if (element.contentText) {
                element.contentText = inHtml(element.contentText)
            }
            if (element.title) {
                element.title = inHtml(element.title)
            }
        })
        data = {
            totalCount : resData.totalCount,
            items:resData.items,
        };
        if (resData.imageUrls.length !==0){
            data.imageUrls = resData.imageUrls
        }
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
//이달의 바다 컨텐츠 리스트
getMonthContentList = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = (!req.query.contentId) ? "" : (req.query.contentId);
    let title = (!req.query.title) ? "" : (req.query.title);
    let status = (!req.query.status) ? "" : (req.query.status);

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //이달의 바다 컨텐츠 리스트
        const resData = await contentService.getMonthContentList(contentId,title,status,numOfRows,offset)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            totalCount : resData.totalCount,
            items:resData.items,
        };
        if (resData.imageUrls.length !==0){
            data.imageUrls = resData.imageUrls
        }
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
// 컨텐츠 이미지 리스트
getContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = (!req.query.contentId) ? "" : (req.query.contentId);

    try {
        // 컨텐츠 이미지 리스트
        const resData = await contentService.getContentImg(contentId)

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
// 이달의 바다 이미지 리스트
getMonthContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = (!req.query.contentId) ? "" : (req.query.contentId);

    try {
        // 이달의 바다 이미지 리스트
        const resData = await contentService.getMonthContentImg(contentId)

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
// 컨텐츠 이미지 추가
addContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
    let media = req.body.media;
    media = (typeof media === 'string') ? JSON.parse(media) : media;

    try {
        // 컨텐츠 이미지 추가
        const resData = await contentService.addContentImg(contentId, media)

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
// 이달의 바다 이미지 등록
addMonthContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
    let media = req.body.media;
    media = (typeof media === 'string') ? JSON.parse(media) : media;

    try {
        // 이달의 바다 이미지 등록
        const resData = await contentService.addMonthContentImg(contentId, media)

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
// 컨텐츠 이미지 수정
updateContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
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
            await contentService.updateContentMediaMainclear(contentId,type)
        }

        await contentService.updateContentMedia(contentId, arraySerialNo, type)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            contentId : contentId
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
// 이달의 바다 이미지 수정
updateMonthContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
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
            await contentService.updateMonthContentMediaMainclear(contentId,type)
        }

        await contentService.updateMonthContentImg(contentId, arraySerialNo, type)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            contentId : contentId
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
// 컨텐츠 이미지 삭제
deleteContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
    let serialNo = req.body.serialNo;
    let arraySerialNo = '';


    try {

        // 컨텐츠 이미지 삭제
        await contentService.deleteContentMedia(contentId, serialNo)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            contentId : contentId
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
// 이달의 바다 이미지 삭제
deleteMonthContentImg = async (req, res, next) => {

    let result = {}
    let data = {}
    let contentId = req.body.contentId;
    let serialNo = req.body.serialNo;
    let arraySerialNo = '';


    try {

        // 이달의 바다 이미지 삭제
        await contentService.deleteMonthContentImg(contentId, serialNo)

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            contentId : contentId
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

    let searchKeyword = (!req.query.searchKeyword) ? "" : (req.query.searchKeyword);

    try {
        // 이마트 리스트
        const resData = await contentService.getEmartList(searchKeyword)

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
// 이달의 바다 플로팅 버튼 설정 등록
addMonthLink = async (req, res, next) => {
    let result = {}
    let data = {}

    let link = (!req.body.link) ? "" : (req.body.link);
    let btnText = (!req.body.btnText) ? "" : (req.body.btnText);

    try {
        //이달의 바다 플로팅 버튼 설정 등록
        const resData = await contentService.addMonthLink(link,btnText)

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
//  이달의 바다 플로팅 버튼 설정 정보 호출
getMonthLink = async (req, res, next) => {

    let result = {}
    let data = {}



    try {
        //이달의 바다 플로팅 버튼 설정 정보 호출
        const resData = await contentService.getMonthLink()

        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            resData
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
    addContent,
    unActiveContent,
    addMonthContent,
    unActiveMonthContent,
    updateContentSortInfo,
    updateMonthContentSortInfo,
    getContentList,
    getMonthContentList,
    getContentImg,
    getMonthContentImg,
    addContentImg,
    addMonthContentImg,
    updateContentImg,
    updateMonthContentImg,
    deleteContentImg,
    deleteMonthContentImg,
    getEmartList,
    addMonthLink,
    getMonthLink,


}
