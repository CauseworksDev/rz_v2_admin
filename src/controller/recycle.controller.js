const responseCommon = require("../common/response");
const recycleService = require("../service/recycle.service");
const checkTypes = require('check-types');
const moment = require('moment');

// 재활용 정보 등록 및 수정
addRecycle = async (req, res, next) => {
    let result = {}
    let data = {}
    let year = (!req.body.year) ? "" : (req.body.year);
    let location = (!req.body.location) ? "" : (req.body.location);
    let weightCoast = (!req.body.weightCoast) ? "" : (req.body.weightCoast);
    let personnel = (!req.body.personnel) ? "" : (req.body.personnel);
    let activeCount = (!req.body.activeCount) ? "" : (req.body.activeCount);
    let dateLast = (!req.body.dateLast) ? "" : (req.body.dateLast);

    try {
        //재활용 정보 등록
        const resData = await recycleService.addRecycle(year,location,weightCoast,personnel,activeCount,dateLast)

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
// 재활용 정보 삭제
deleteRecycle = async (req, res, next) => {
    let result = {}
    let data = {}
    let year = (!req.body.year) ? "" : (req.body.year);
    let location = (!req.body.location) ? "" : (req.body.location);

    try {
        //재활용 정보 등록
        const resData = await recycleService.deleteRecycle(year,location)

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

// 재활용 정보 리스트
getRecycleList = async (req, res, next) => {

    let result = {}
    let data = {}
    let year = (!req.query.year) ? "" : (req.query.year);
    let location = (!req.query.location) ? "" : (req.query.location);

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //재활용 정보 리스트
        const resData = await recycleService.getRecycleList(numOfRows,offset,year,location)

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

// 재활용 정보 토탈
getRecycleTotal = async (req, res, next) => {

    let result = {}
    let data = {}
    let year = (!req.query.year) ? "" : (req.query.year);
    let location = (!req.query.location) ? "" : (req.query.location);


    try {
        //재활용 정보 토탈
        const resData = await recycleService.getRecycleTotal(year,location)

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

// 플라스틱 수거 정보 등록 및 수정
addRecyclePet = async (req, res, next) => {
    let result = {}
    let data = {}
    let weightPet = (!req.body.weightPet) ? "" : (req.body.weightPet);
    let dateLast = (!req.body.dateLast) ? "" : (req.body.dateLast);

    try {
        //플라스틱 수거 정보 등록
        const resData = await recycleService.addRecyclePet(weightPet,dateLast)

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
// 플라스틱 수거 정보 리스트
getRecyclePetList = async (req, res, next) => {

    let result = {}
    let data = {}

    let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
    let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
    let offset = (pageNo - 1) * numOfRows;
    try {
        //재활용 정보 리스트
        const resData = await recycleService.getRecyclePetList(numOfRows,offset)

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
    addRecycle,
    deleteRecycle,
    getRecycleList,
    getRecycleTotal,
    addRecyclePet,
    getRecyclePetList,



}
