const db = require('../middleware/db.pool');
const awsSdk = require("aws-sdk");
const dbApp = db.appPool();
const queryService = require('../query/push.query');
const utilCreateId = require('../middleware/createId');
const admin = require('firebase-admin');
const serviceAccount = require('../common/serviceAccountKey.json');
const {IncomingWebhook} = require('@slack/webhook');
const moment = require("moment/moment");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
let envConfigFile = '';
switch (process.env.NODE_ENV) {
    case 'prod':
        envConfigFile = __dirname + '/../config/prod.config';
        break;
    case 'qc':
        envConfigFile = __dirname + '/../config/qc.config';
        break;
    case 'local':
        envConfigFile = __dirname + '/../config/local.config';
        break;
    case 'dev':
    default:
        envConfigFile = __dirname + '/../config/dev.config';
        break;
}


userPush = async (userData, detailData,type,pushId) => {
    let uid = userData.uid
    let pushToken = userData.pushToken
    let sendType = 1
    if(!type){
        sendType = 1
    }else{
        sendType = type
    }
    if(!pushId){
        pushId = ""
    }
    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let pushMessage = {
            notification: {
                title: detailData.title
                , body: detailData.message
            }
            , android: {
                notification: {
                    title: detailData.title,
                    body: detailData.message,
                    channel_id: "aivi_notification",
                    click_action: "OPEN_ACTIVITY",
                    // icon:"https://play-lh.googleusercontent.com/njO9i013iqL-QJs6rCaKfjl7YebH_9KWy_e46M-khtKdAdllbWJ4562bXH4aTrG5-g=s180-rw"
                }
            }
            , apns: {
                payload: {
                    aps: {
                        sound: "default",
                        badge: 1
                    }
                }
            }
            , data: detailData
            , token: pushToken
        };
        // console.log(pushMessage)
        let status = 1
        let errorMessage = ""
        if(pushToken){
            await admin.messaging().send(pushMessage).then(function (response) {
                console.log('보내기 성공');
                status = 1

            }).catch(function (error) {
                console.log('보내기 실패: ' + error);
                status = 2
                errorMessage = error

            });
            query = queryService.addPushHistory(uid, sendType, "", status, detailData.title, detailData.message,errorMessage,pushId);
            [rows] = await connection.query(query);

            await connection.commit();
            connection.release();

            // return rows[0]
            return true
        }else{
            console.log('uid : ',uid , '푸쉬 토큰 없음')
        }





    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
pushToTopic = async (massageData) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        let resultPush = false;

        let type = massageData.type;
        let status = massageData.status;
        let topic = massageData.topic
        let title = massageData.title;
        let message = massageData.message;

        let pushMessage = {
            notification: {
                title: title,
                body: message
            }
            , android: {
                notification: {
                    title: title,
                    body: message,
                    channel_id: "aivi_notification",
                    click_action: "OPEN_ACTIVITY",
                    // icon: "https://play-lh.googleusercontent.com/njO9i013iqL-QJs6rCaKfjl7YebH_9KWy_e46M-khtKdAdllbWJ4562bXH4aTrG5-g=s180-rw"
                }
            }
            , apns: {
                payload: {
                    aps: {
                        sound: "default",
                        badge: 1
                    }
                }
            }
            , data: {
                title :title,
                message : message

            }
            , topic: topic
        };

        admin.messaging().send(pushMessage).then(function (response) {
            console.log('보내기 성공');
            status = 1
            resultPush = true;
        }).catch(function (error) {
            console.log('보내기 실패: ' + error);
            status = 2
        });
        await connection.beginTransaction();
        let query = ``;
        let [rows] = [];

        query = queryService.addPushHistory("", type, topic, status, title, message);
        [rows] = await connection.query(query);

        await connection.commit();
        connection.release();

        return true;
    } catch (err) {
        await connection.rollback();
        connection.release();

        console.log('Error: ', err);

        return false;
    }

};

slackPush = async (url, detailData) => {
    const webhook = new IncomingWebhook(url);

    try {
        await webhook.send({
            text: `(${process.env.NODE_ENV}) 아바타 이미지 저장 완료 txId : ${detailData.txId}`,
        });

    } catch (err) {
        throw err
    }
}
reservationPush = async (pushId,message,title,adminTitle,dateReservation,status,
                         retryType,active,action1,action2,action3,requestTime,contentCategory,contentId,
                         dateRetryFrom,dateRetryTo) => {
    if(!pushId){
        pushId = await utilCreateId.createId(1);
    }
    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addReservationPush(pushId,message,title,adminTitle,dateReservation,1,
            retryType,active,action1,action2,action3,requestTime,contentCategory,contentId,
            dateRetryFrom,dateRetryTo);

        if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            console.debug(query);
        }

        [rows] = await connection.query(query);

        query = queryService.getReservationPush(false, 0, 20, pushId);
        if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            console.debug(query);
        }
        [rows] = await connection.query(query);

        await connection.commit();
        connection.release();

        return rows[0]

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateReservationPushStatus = async (pushId,status) => {
    if(!pushId){
        pushId = await createId(1);
    }
    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateReservationPushStatus(pushId,status);

        if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            // console.debug(query);
        }

        [rows] = await connection.query(query);


        await connection.commit();
        connection.release();

        return rows[0]

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

reservationPushList = async (numOfRows,offset,pushId,dateReservation,status,retryType,sendGroup,adminTitle,active,dateFrom,dateTo) => {


    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let totalCount = 0

        query = queryService.getReservationPush(true,offset,numOfRows,pushId,status,dateReservation,retryType,active,"",sendGroup,adminTitle,dateFrom,dateTo);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getReservationPush(false,offset,numOfRows,pushId,status,dateReservation,retryType,active,"",sendGroup,adminTitle,dateFrom,dateTo);
        [rows] = await connection.query(query);
        console.log(query)
        // console.log(rows)

        let resultData = {
            totalCount : totalCount,
            items : rows
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
reservationPushRetryList = async (numOfRows,offset,pushId,status,retryType,active,nowDate) => {


    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let totalCount = 0
        query = queryService.getReservationPush(true,offset,numOfRows,pushId,status,"",retryType,active,nowDate);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getReservationPush(false,offset,numOfRows,pushId,status,"",retryType,active,nowDate);
        [rows] = await connection.query(query);
        // console.log(query)
        // console.log(rows)

        let resultData = {
            totalCount : totalCount,
            items : rows
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
getPushHistory = async (numOfRows,offset,uid, topic, type,status,dateFrom,dateTo) => {


    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let totalCount = 0
        query = queryService.getPushHistory(true,offset,numOfRows,uid, topic, type,status,dateFrom,dateTo);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getPushHistory(false,offset,numOfRows,uid, topic, type,status,dateFrom,dateTo);
        [rows] = await connection.query(query);
        // console.log(query)
        // console.log(rows)

        let resultData = {
            totalCount : totalCount,
            items : rows
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
getUidArray = async (reservationInfo) => {


    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let totalCount = 0
        // 그룹체크 1:전체, 2:android , 3:ios ,4:별도의 조건
        let sendGroup = reservationInfo.sendGroup
        let action1 = ""
        let action2 = ""
        let date = ""
        let day = ""
        if(sendGroup == 4){
            action1 = reservationInfo.action1
            action2 = reservationInfo.action2
            date = moment().subtract(parseInt(reservationInfo.dateRetry), "days").format("YYYY-MM-DD")
            day = parseInt(reservationInfo.dateRetry)
        }
        let uidArray = []
        console.log(action1,action2,date,day)
        query = queryService.getPushUidList(sendGroup,action1,action2,date,day);
        [rows] = await connection.query(query);
        console.log(query)
        if(rows.length !== 0){
            for (let i = 0; i < rows.length ; i++) {
                    uidArray.push(rows[i].uid)
            }
        }

        await connection.commit();
        connection.release();


        return uidArray

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
module.exports = {
    userPush,
    slackPush,
    pushToTopic,
    reservationPush,
    reservationPushList,
    reservationPushRetryList,
    updateReservationPushStatus,
    getPushHistory,
    getUidArray,


}