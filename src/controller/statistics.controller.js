const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const responseCommon = require('../common/response');
const queryEvent = require('../query/statistics.query');

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
    handleJobStatistics,
};
