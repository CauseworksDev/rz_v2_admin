const db = require('../middleware/db.pool');
const dbPush = db.pushPool();
const queryPush = require('../query/push.query');
const pushService = require("../service/push.service");
const requestPush = require('../request/push.request');
const memberCommon = require('../common/member');
const responseCommon = require('../common/response');

const admin = require('firebase-admin');
const serviceAccount = require('../common/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/../../.env') });

addDeviceToken = async (req, res, next) => {
    try {
        if(await requestPush.checkParamType(requestPush.apiName.requestAddDeviceToken, req) === false) {
            responseCommon.sendResponseFailDataParameter(res);
            return false;
        }

        let uid = req.body.uid;
        let adid = req.body.adid;
        let token = req.body.token;

        const connection = await dbPush.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = [];

            query = queryPush.checkDeviceAdid(adid);
            if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                    console.debug(query);
                }
            }
            [rows] = await connection.query(query);
            if(rows.length) {
                query = queryPush.updateDeviceToken(adid, token);
                if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                    if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                        console.debug(query);
                    }
                }
                [rows] = await connection.query(query);
            }
            else {
                query = queryPush.addDeviceAdid(adid, token);
                if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                    if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                        console.debug(query);
                    }
                }
                [rows] = await connection.query(query);
            }

            await connection.commit();
            connection.release();

            let result = {
                resultCode : responseCommon.RESULT.SUCCESS.code,
                resultMsg : responseCommon.RESULT.SUCCESS.string
            };
            let data = {
                uid: uid,
            };
            responseCommon.sendResponseResult(result, data, res);
            return true;
        } catch(err) {
            await connection.rollback();
            connection.release();

            console.log('Error: ', err);

            let resultCode = responseCommon.checkErrorCode(err.code);
            let result = {
                resultCode : resultCode,
                resultMsg : responseCommon.getErrorString(resultCode)
            };
            let data = {};
            responseCommon.sendResponseResult(result, data, res);
            return false;
        }
    } catch(err) {
        responseCommon.sendResponseFailSystem(err.code, res);
        return false;
    }
};
pushToSingle = async (req, res, next) => {
    try {
        if(await requestPush.checkParamType(requestPush.apiName.requestPushToSingle, req) === false) {
            responseCommon.sendResponseFailDataParameter(res);
            return false;
        }

        let title = req.body.title;
        let message = req.body.message;
        let uid = req.body.uid;
        let email = req.body.email
        let type = req.body.type;
        let token = '';

        try {
            token = req.body.token;
        }
        catch (err) {}

        let pushMessage = {
            notification: {
                title: title,
                body: message
            }
            , data: {
                type: '타입',
                style: '스타일'
            }
            , token: token
        };

        admin.messaging().send(pushMessage).then(function (response) {
            console.log('보내기 성공');
        }).catch(function (error) {
            console.log('보내기 실패: ' + error);
        });

        const connection = await dbPush.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = [];
            let device = [];
            let items = {};

            if(!token) {

            }

            query = queryPush.addPushMsgSingle(uid, type, 1, title, message);
            if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                console.debug(query);
            }
            [rows] = await connection.query(query);

            await connection.commit();
            connection.release();

            let result = {
                resultCode: responseCommon.RESULT.SUCCESS.code,
                resultMsg: responseCommon.RESULT.SUCCESS.string
            };
            let data = {

            };
            responseCommon.sendResponseResult(result, data, res);
            return true;
        } catch(err) {
            await connection.rollback();
            connection.release();

            console.log('Error: ', err);

            let resultCode = responseCommon.checkErrorCode(err.code);
            let result = {
                resultCode : resultCode,
                resultMsg : responseCommon.getErrorString(resultCode)
            };
            let data = {};
            responseCommon.sendResponseResult(result, data, res);
            return false;
        }

        let result = {
            resultCode: responseCommon.RESULT.SUCCESS.code,
            resultMsg: responseCommon.RESULT.SUCCESS.string
        };
        let data = {

        };
        responseCommon.sendResponseResult(result, data, res);
    }
    catch(err) {
        responseCommon.sendResponseFailSystem(err.code, res);
        return false;
    }
};

pushToGroup = async (req, res, next) => {
    try {

    }
    catch(err) {
        responseCommon.sendResponseFailSystem(err.code, res);
        return false;
    }
};

pushToTopic = async (req, res, next) => {
    try {
        if(await requestPush.checkParamType(requestPush.apiName.requestPushToTopic, req) === false) {
            responseCommon.sendResponseFailDataParameter(res);
            return false;
        }

        let resultPush = false;

        let type = req.body.type;
        let category = req.body.category;
        let status = req.body.status;
        let serialNo = req.body.serialNo;

        let title = req.body.title;
        let message = req.body.message;

        let image = req.body.image;

        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount)
        // });

        let pushMessage = {
            notification: {
                title: title,
                body: message
            }
            // , topic: 'detion-test-group-1'
            , topic: 'topic-james'
            // , sound: "default"
            // , icon: "fcm_push_icon"
        };

        admin.messaging().send(pushMessage).then(function (response) {
            console.log('보내기 성공');
            console.log(resultPush);
            resultPush = true;
            console.log(resultPush);
        }).catch(function (error) {
            console.log('보내기 실패: ' + error);
        });

        const connection = await dbPush.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = [];
            let device = [];
            let items = {};

            query = queryPush.addPushMsgTopic(type, category, status, serialNo, title, message, image);
            if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                console.debug(query);
            }
            [rows] = await connection.query(query);

            await connection.commit();
            connection.release();

            let result = {
                resultCode: responseCommon.RESULT.SUCCESS.code,
                resultMsg: responseCommon.RESULT.SUCCESS.string
            };
            let data = {

            };
            responseCommon.sendResponseResult(result, data, res);
            return true;
        } catch(err) {
            await connection.rollback();
            connection.release();

            console.log('Error: ', err);

            let resultCode = responseCommon.checkErrorCode(err.code);
            let result = {
                resultCode : resultCode,
                resultMsg : responseCommon.getErrorString(resultCode)
            };
            let data = {};
            responseCommon.sendResponseResult(result, data, res);
            return false;
        }

        let result = {
            resultCode: responseCommon.RESULT.SUCCESS.code,
            resultMsg: responseCommon.RESULT.SUCCESS.string
        };
        let data = {

        };
        responseCommon.sendResponseResult(result, data, res);
    }
    catch(err) {
        responseCommon.sendResponseFailSystem(err.code, res);
        return false;
    }
};
// 푸쉬 예약
reservationPush = async (req, res, next) => {

    let result = {}
    let data = {}

    try {
        let pushId = req.body.pushId
        let message = req.body.message
        let adminTitle = (!req.body.adminTitle) ? "" : (req.body.adminTitle);
        let retryType = (!req.body.retryType) ? "3" : (req.body.retryType);//1:한번 ,2:반복 ,3:기간 반복
        let active = (!req.body.active) ? "2" : (req.body.active);//1:활성, 2비활성

        let title = req.body.title
        let dateReservation = (!req.body.dateReservation) ? "" : (req.body.dateReservation);//1:결제 없음, 2:미실행
        let dateRetryFrom = (!req.body.dateRetryFrom) ? "" : (req.body.dateRetryFrom);
        let dateRetryTo = (!req.body.dateRetryTo) ? "" : (req.body.dateRetryTo);
        let requestTime = (!req.body.requestTime) ? "" : (req.body.requestTime);
        let contentCategory = (!req.body.contentCategory) ? "" : (req.body.contentCategory);
        let contentId = (!req.body.contentId) ? "" : (req.body.contentId);
        let status = req.body.status

        const resData = await pushService.reservationPush(pushId,message,title,adminTitle,dateReservation,status,
            retryType,active,requestTime,contentCategory,contentId,
            dateRetryFrom,dateRetryTo)
        // console.log(resData)


        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = {
            pushId : resData.pushId
        };
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('sendPush:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
// 푸쉬 예약 리스트
reservationPushList = async (req, res, next) => {

    let result = {}
    let data = {}

    try {

        let pushId = (!req.query.pushId) ? "" : parseInt(req.query.pushId);
        let dateReservation = (!req.query.dateReservation) ? "" : (req.query.dateReservation);
        let status = (!req.query.status) ? "" : (req.query.status);
        let sendGroup = (!req.query.sendGroup) ? "" : (req.query.sendGroup);
        let retryType = (!req.query.retryType) ? "" : (req.query.retryType);
        let adminTitle = (!req.query.adminTitle) ? "" : (req.query.adminTitle);
        let active = (!req.query.active) ? "" : (req.query.active);
        let dateFrom = (!req.query.dateFrom) ? "" : (req.query.dateFrom);
        let dateTo = (!req.query.dateTo) ? "" : (req.query.dateTo);
        let pageNo = (req.query.pageNo === undefined) ? 1 : parseInt(req.query.pageNo);
        let numOfRows = (req.query.numOfRows === undefined) ? 20 : parseInt(req.query.numOfRows);
        let offset = (pageNo - 1) * numOfRows;

        const resData = await pushService.reservationPushList(numOfRows,offset,pushId,dateReservation,status,retryType,sendGroup,adminTitle,active,dateFrom,dateTo)
        // console.log(resData)


        result = {
            resultCode : responseCommon.RESULT.SUCCESS.code,
            resultMsg : responseCommon.RESULT.SUCCESS.string
        };
        data = resData
        ;
        responseCommon.sendResponseResult(result, data, res);

    } catch (err) {
        console.log('sendPush:: ', err);
        responseCommon.sendResponseFail(err.code, res);
        result = {
            resultCode : err.code,
            resultMsg : err.message
        };
    }

}
module.exports = {
    addDeviceToken,
    pushToSingle,
    pushToGroup,
    pushToTopic,
    reservationPush,
    reservationPushList,
};

