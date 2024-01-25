const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const responseCommon = require('../common/response');
const queryEvent = require('../query/statistics.query');
const xlsx = require( "xlsx" );

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '/../../.env')});
let awsSdk = require('aws-sdk');

let path_config = '';
switch (process.env.NODE_ENV) {
    case 'prod':
        path_config = __dirname + '/../config/prod.config.js';
        break;
    case 'qc':
        path_config = __dirname + '/../config/qc.config.js';
        break;
    case 'local':
        path_config = __dirname + '/../config/local.config.js';
        break;
    case 'dev':
    default:
        path_config = __dirname + '/../config/dev.config.js';
        break;
}
const configSet = require(path_config);
const moment = require("moment/moment");
const fs = require("fs");

getStatistics = async (type) => {
    console.debug('===payment Statistics===');
    console.debug('date: ', new Date());
    let authInfo = [];
    let result = {};

    try {
        const connection = await dbApp.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = [];
            /**
             * 통계 데이터 불러오기 function 작성작성*/
            // query = queryEvent.getStatistics();
            // if (parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            //     console.debug(query);
            // }
            // [rows] = await connection.query(query);
            // if (rows.length <= 0) {
            //     let err = {};
            //     err.code = responseCommon.RESULT.NOT_FOUND.code;
            //     throw err;
            // }
            /**
             * 통계 업데이트 function 작성*/
            // query = queryEvent.updateStatics(rows[0].webAuthOk,rows[0].webAuthFail,rows[0].webAuthExpire,rows[0].appAuthOk,rows[0].appAuthExpire,rows[0].paymentOk,rows[0].paymentFail);
            // if (parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            //     console.debug(query);
            // }
            // [rows] = await connection.query(query);

            await connection.commit();
            connection.release();
        } catch (err) {
            await connection.rollback();
            connection.release();

            console.log('Error: ', err);

            return false;
        }
    } catch (err) {
        console.log('Error: ', err);
        return false;
    }


    return true;
};
getStatisticsExcel = async (req, res, next) => {
    try {
        //통계 엑셀 다운
        let cid = parseInt(req.body.cid);
        console.log(req.query)
        let dateFrom = (req.query.dateFrom === undefined) ? "" : (req.query.dateFrom);
        let dateTo = (req.query.dateTo === undefined) ? "" : (req.query.dateTo);

        const connection = await dbApp.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = [];
            //엑셀로 뽑을 데이터 추출
            /**
             * 통계 데이터 불러오기 function 작성작성*/
            // query = queryEvent.getStatistics();
            // if (parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
            //     console.debug(query);
            // }
            // [rows] = await connection.query(query);
            // await connection.commit();
            // connection.release();
            //엑셀 설정 시작
            // const book = xlsx.utils.book_new();
            // const doctors = xlsx.utils.json_to_sheet( rows );
            // await xlsx.utils.book_append_sheet( book, doctors, "Transaction" );
            // await xlsx.writeFile( book, __dirname+"/../excel/"+"Transaction.xlsx" ,{compression:true});
            // 엑셀 설정 끝
            //엑셀 만들기 시작
            // let fs = require('fs');
            // let path = require('path');
            // let mime = require('mime');
            // let upload_folder = __dirname+"/../excel/";
            // let file = upload_folder + "Transaction.xlsx"; // ex) /upload/files/sample.txt
            // if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            //
            //     let filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            //     let mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            //     console.log("파일이름",filename)
            //     console.log("파일형식",mimetype)
            //     res.setHeader('Content-disposition', 'attachment; filename= ' + filename); //
            //     res.setHeader('Content-type', mimetype); // 파일 형식 지정
            //
            //     let filestream = fs.createReadStream(file);
            //     filestream.pipe(res);
            // } else {
            //     res.send('해당 파일이 없습니다.');
            //     return;
            // }
            //엑셀 만들기 끝
            return true;
        } catch (err) {
            await connection.rollback();
            connection.release();

            console.log('Error: ', err);

            let resultCode = responseCommon.checkErrorCode(err.code);
            let result = {
                resultCode: resultCode,
                resultMsg: responseCommon.getErrorString(resultCode)
            };
            let data = {};
            responseCommon.sendResponseResult(result, data, res);
            return false;
        }
    } catch (err) {
        console.log(err)
        responseCommon.sendResponseFailSystem(err.code, res);
        return false;
    }
};

handleJobStatistics = async () => {
    try {
        console.debug('date: ', new Date());


        await getStatistics();

        return true;
    } catch (err) {
        console.log('Error: ', err);
        return false;
    }
};

module.exports = {
    getStatistics,
    getStatisticsExcel,
    handleJobStatistics,
};
