const jwt = require('jsonwebtoken');
const responseCommon = require('../common/response');
const memberCommon = require('../common/member');
const moment = require('moment');
const db = require('../middleware/db.pool');
const dbApp = db.appPool();

const ACCESS_TOKEN = 'access-token';
const CERT_TOKEN = 'cert-token';
const CONTENT_TYPE = 'Content-Type';
const API_KEY = 'api-key';

const TOKEN_MINUTE_ONE = 1;
const TOKEN_DAY_ONE = 1;
const TOKEN_DAY_SHORT = 30;
const TOKEN_DAY_LONG = 60;

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
// const queryMember = require("../query/member.query");
// const queryUser = require("../query/user.query");

generateAccessToken = function (cid, role, emailId, day) {
    return jwt.sign({_cid: cid, _role: role, _emailId: emailId}
        , `${configSet.PRIVATE_KEY.access}`
        , {expiresIn: 60 * 60 * 24 * day});  // 유효기간 day 일  60 * 60 * 24 * day
    // , {expiresIn: 60 * day});  // 유효기간 day 일  60 * 60 * 24 * day
};
generateAccessEmailToken = function (day, emailId) {
    day = new Date(day)
    return jwt.sign({_day: moment(day, 'YYYY-MM-DD HH:mm:ss'), _email: emailId}
        , `${configSet.PRIVATE_KEY.access}`
        , {expiresIn: '10m'});  // 유효기간 day 일  60 * 60 * 24 * day
};
generateCertToken = function (cid, role, emailId, certKey, minute) {
    return jwt.sign({_cid: cid, _role: role, _emailId: emailId, _certKey: certKey}
        , `${configSet.PRIVATE_KEY.cert}`
        , {expiresIn: 60 * minute});  // 유효기간 분단위
};

generateAPIKEY = function (cid, emailId, bizNo) {
    return jwt.sign({_cid: cid, _emailId: emailId, _bizNo: bizNo});
};

verifyAccessToken = function (req, res, next) {
    let authToken = req.headers[ACCESS_TOKEN];
    let apiKey = req.headers[API_KEY];

    if (authToken === undefined || authToken === '') {
        responseCommon.sendResponseFailDataCid(req, res);
        return;
    }

    if (apiKey === undefined || apiKey === '') {
        responseCommon.sendResponseFailAuth(res);
        return;
    }

    jwt.verify(authToken.toString()
        , `${configSet.PRIVATE_KEY.access}`
        , function (err, decoded) {
            if (err !== null) {
                console.log(err)
                req.decoded_err = err;
                responseCommon.sendResponseFailDataNotCId(req, res);
                return;
            }
            req.decoded = decoded;

            let cid;
            let adid = '';
            let uid = '';
            if (req.method === 'GET') {
                cid = req.query.cid;
                adid = req.query.adid;
                if (req.query.uid) {
                    uid = req.query.uid;
                }
            } else {
                cid = req.body.cid;
                adid = req.body.adid;
                if (req.body.uid) {
                    uid = req.body.uid;
                }
            }
            if (adid === '00000000-0000-0000-0000-000000000000') {
                responseCommon.sendResponseFailDataNotCId(req, res);
                return false;
            }

            if (cid && isNaN(cid) === false
                && parseInt(cid) !== req.decoded._cid
                && adid !== undefined
                && adid.toLowerCase() !== req.decoded._emailId.toLowerCase()) {
                responseCommon.sendResponseFailDataNotCId(req, res);
                return false;
            } else {
                if (req.decoded._cid === `${configSet.DEVICE_API_KEY.ios.name}`) {
                    if (apiKey !== configSet.DEVICE_API_KEY.ios.key) {
                        responseCommon.sendResponseFailAuth(res);
                        return false;
                    }
                } else if (req.decoded._cid === `${configSet.DEVICE_API_KEY.android.name}`) {
                    if (apiKey !== `${configSet.DEVICE_API_KEY.android.key}`) {
                        responseCommon.sendResponseFailAuth(res);
                        return false;
                    }
                } else if (uid) {
                    if (req.decoded._role == 4) {

                    } else {
                        if (parseInt(uid) !== req.decoded._cid) {
                            responseCommon.sendResponseFailAuth(res);
                            return false;
                        }
                    }

                }

                next();
            }
        })
};

verifyCertToken = function (req, res, next) {
    let certToken = req.headers[CERT_TOKEN];
    let apiKey = req.headers[API_KEY];

    if (certToken === undefined || certToken === '') {
        responseCommon.sendResponseFailDataCid(req, res);
        return;
    }

    if (apiKey === undefined || apiKey === '') {
        responseCommon.sendResponseFailAuth(res);
        return;
    }

    jwt.verify(certToken
        , `${configSet.PRIVATE_KEY.cert}`
        , function (err, decoded) {
            if (err !== null) {
                req.decoded_err = err;
                responseCommon.sendResponseFailDataNotCId(req, res);
                return;
            }
            req.decoded = decoded;

            let cid = 0;
            if (req.method === 'GET') {
                cid = req.query.cid;
            } else {
                cid = req.body.cid;
            }

            if (cid !== req.decoded._cid) {
                responseCommon.sendResponseFailDataNotCId(req, res);
                return false;
            } else {
                next();
            }
        })
};

getToken = function (req) {
    let token = req.headers[ACCESS_TOKEN];
    return token;
};

// sign out or membership withdrawal
deleteToken = function (cid) {


};
getMemberStatus = async function (req, res, next) {
    let authToken = req.headers[ACCESS_TOKEN];
    let apiKey = req.headers[API_KEY];

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = [];

        let item = {};
        let corp = {};
        let manager = {};
        let cid = ""
        let adid = ""
        let uid = ""


        if (authToken === undefined || authToken === '') {
            responseCommon.sendResponseFailDataCid(req, res);
            return;
        }

        if (apiKey === undefined || apiKey === '') {
            responseCommon.sendResponseFailAuth(res);
            return;
        }
        jwt.verify(authToken.toString()
            , `${configSet.PRIVATE_KEY.access}`
            , async function (err, decoded) {
                if (err !== null) {
                    console.log(err)
                    req.decoded_err = err;
                    responseCommon.sendResponseFailDataNotCId(req, res);
                    return;
                }
                req.decoded = decoded;

                let cid;
                let adid = '';
                let uid = '';
                if (req.method === 'GET') {
                    cid = req.query.cid;
                    adid = req.query.adid;
                    if (req.query.uid) {
                        uid = req.query.uid;
                    }
                } else {
                    cid = req.body.cid;
                    adid = req.body.adid;
                    if (req.body.uid) {
                        uid = req.body.uid;
                    }
                }

                if (cid && isNaN(cid) === false
                    && parseInt(cid) !== req.decoded._cid
                    && adid !== undefined
                    && adid.toLowerCase() !== req.decoded._emailId.toLowerCase()) {
                    return false;
                } else {

                    if (req.decoded._cid === `${configSet.DEVICE_API_KEY.ios.name}`||req.decoded._cid === `${configSet.DEVICE_API_KEY.android.name}`) {
                        // query = queryUser.getUserDetail(uid);
                        if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                            console.debug(query);
                        }
                        [rows] = await connection.query(query);

                        if (rows.length !== 0) {
                            console.log("유저정보 체크 : ", rows)
                            if (rows[0].status == 1) {
                                console.log("넥스트")
                                next()
                            } else {
                                responseCommon.sendResponseFailAuth(res);
                                return false;
                            }
                        } else {
                            responseCommon.sendResponseFailAuth(res);
                            return false;
                        }
                    } else{
                        // query = queryMember.getMemberCorporation(cid, 1);
                        if (parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
                            console.debug(query);
                        }
                        [rows] = await connection.query(query);
                        await connection.commit();
                        connection.release();
                        console.log("가맹점정보 체크 : ", rows)
                        if (rows.length !== 0) {
                            if (rows[0].status == 1) {
                                console.log("넥스트")
                                next()
                            } else {
                                responseCommon.sendResponseFailAuth(res);
                                return false;
                            }
                        } else {
                            responseCommon.sendResponseFailAuth(res);
                            return false;
                        }
                    }
                }
            })




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
}
module.exports = {
    TOKEN_MINUTE_ONE,
    TOKEN_DAY_ONE,
    TOKEN_DAY_SHORT,
    TOKEN_DAY_LONG,
    ACCESS_TOKEN,
    CERT_TOKEN,
    CONTENT_TYPE,
    API_KEY,
    generateAccessToken,
    generateAccessEmailToken,
    generateCertToken,
    generateAPIKEY,
    verifyAccessToken,
    verifyCertToken,
    getToken,
    deleteToken,
    getMemberStatus,
};