// const botkit = require('botkit');
let sendMassageKey = 'xoxb-321660083479-1343133911091-R7SLqdiq9kTbziNSF7pM1cyA';
// const controller = botkit.slackbot({
// });
// const bot = controller.spawn({ token: sendMassageKey || '' });
const RESULT = {
    SUCCESS: {code:200, string:'SUCCESS'},
    BAD_REQUEST: {code:400, string:'BAD REQUEST'},
    UNAUTHORIZED: {code:401, string:'UNAUTHORIZED'},
    PAYMENT_REQUIRED: {code:402, string:'PAYMENT REQUIRED'},
    FORBIDDEN: {code:403, string:'FORBIDDEN'},
    NOT_FOUND: {code:404, string:'NOT FOUND'},
    SYSTEM_ERR: {code:500, string:'SYSTEM ERROR'},

};

const RESULT_ENUM = {
    200: {code:200, string:'SUCCESS'},
    400: {code:400, string:'BAD REQUEST'},
    401: {code:401, string:'UNAUTHORIZED'},
    402: {code:402, string:'PAYMENT REQUIRED'},
    403: {code:403, string:'FORBIDDEN'},
    404: {code:404, string:'NOT FOUND'},
    406: {code:406, string:'NOT ACCEPTABLE'},
    409: {code:409, string:'CONFLICT'},
    422: {code:422, string:'UNPROCESSABLE ENTITY'},
    500: {code:500, string:'SYSTEM ERROR'},
    408: {code:408, string:'DALLE2 ERROR'}
};

sendResponseData = function(code, data, res){
    try {
        let body = {
            result: {
                resultCode: RESULT_ENUM[code]['code'],
                resultMsg: RESULT_ENUM[code]['string']
            },
            data: data
        };
        // console.log(`[${code}]`)
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

const METHOD_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const RESULT_VALID_CID = {
    SUCCESS: 0,
    FAIL_DECODED: -1,
    FAIL_NOT_EQUAL: -2
};

checkAuthItemErrorCode = function(code) {
    let errorCode = RESULT.SUCCESS.code;
    switch(code) {
        case RESULT.SUCCESS.code:
        case RESULT.BAD_REQUEST.code:
        case RESULT.UNAUTHORIZED.code:
        case RESULT.PAYMENT_REQUIRED.code:
        case RESULT.FORBIDDEN.code:
        case RESULT.NOT_FOUND.code:
        case RESULT.SYSTEM_ERR.code:
        case 1062:
            errorCode = RESULT.CONFLICT.code;
            break;
        case 1064:
        default:
            errorCode = RESULT.SYSTEM_ERR.code;
            break;
    }
    return errorCode;
};

checkErrorCode = function(code) {
    let errorCode = RESULT.SUCCESS.code;
    switch(code) {
        case RESULT.SUCCESS.code:
        case RESULT.BAD_REQUEST.code:
        case RESULT.UNAUTHORIZED.code:
        case RESULT.PAYMENT_REQUIRED.code:
        case RESULT.FORBIDDEN.code:
        case RESULT.NOT_FOUND.code:
        case RESULT.SYSTEM_ERR.code:
            errorCode = code;
            break;
        case 1064:
        default:
            errorCode = RESULT.SYSTEM_ERR.code;
            break;
    }
    return errorCode;
};

getAuthItemErrorString = function(code) {
    let errorString = RESULT.SYSTEM_ERR.string;
    switch(code) {
        case RESULT.SUCCESS.code:
            errorString = RESULT.SUCCESS.string;
            break;
        default:
            errorString = RESULT.SYSTEM_ERR.string;
            break;
    }
    return errorString;
};

getErrorString = function(code) {
    let errorString = RESULT.SYSTEM_ERR.string;
    switch(code) {
        case RESULT.SUCCESS.code:
            errorString = RESULT.SUCCESS.string;
            break;
        case RESULT.BAD_REQUEST.code:
            errorString = RESULT.BAD_REQUEST.string;
            break;
        case RESULT.UNAUTHORIZED.code:
            errorString = RESULT.UNAUTHORIZED.string;
            break;
        case RESULT.PAYMENT_REQUIRED.code:
            errorString = RESULT.PAYMENT_REQUIRED.string;
            break;
        case RESULT.FORBIDDEN.code:
            errorString = RESULT.FORBIDDEN.string;
            break;
        case RESULT.NOT_FOUND.code:
            errorString = RESULT.NOT_FOUND.string;
            break;
        case RESULT.SYSTEM_ERR.code:
            errorString = RESULT.SYSTEM_ERR.string;
            break;

        default:
            errorString = RESULT.SYSTEM_ERR.string;
            break;
    }
    return errorString;
};

checkValidationToken = function(type, req, res) {
    try {
        if (!req.decoded) {
            sendResponseFailDataCid(req, res);
            return RESULT_VALID_CID.FAIL_DECODED;
        } else {
            if(type === this.METHOD_TYPE.GET) {
                if (req.query.cid !== req.decoded._cid) {
                    sendResponseFailDataNotCId(req, res);
                    return RESULT_VALID_CID.FAIL_NOT_EQUAL;
                }
            }
            else {
                if (req.body.cid !== req.decoded._cid) {
                    sendResponseFailDataNotCId(req, res);
                    return RESULT_VALID_CID.FAIL_NOT_EQUAL;
                }
            }
            return true;
        }
    }
    catch(err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseResult = function(result, data, res) {
    try {
        let body = {
            result: result,
            data: data
        };
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseBody = function(body, res) {
    try {
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailDataCid = function(req, res) {
    try {
        let result = {};
        if( !req.decoded_err)
        {
            result = {
                resultCode : this.RESULT.UNAUTHORIZED.code,
                resultMsg : 'can not found access token.'
            };
        }
        else
        {
            result = {
                resultCode : this.RESULT.UNAUTHORIZED.code,
                resultMsg : 'access token is invalid.'
            };
        }
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailDataNotCId = function(req, res) {
    try {
        let result;
        result = {
            resultCode : this.RESULT.UNAUTHORIZED.code,
            resultMsg : 'CID is not equal.'
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailDataParameter = function(res) {
    try {
        let result;
        result = {
            resultCode : this.RESULT.BAD_REQUEST.code,
            resultMsg : this.RESULT.BAD_REQUEST.string
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailData = function(err, res) {
    try {
        let result;
        let resultMsg = '';

        if(err === undefined) {
            err = RESULT.SYSTEM_ERR.code;
        }

        resultMsg = this.getErrorString(err);

        result = {
            resultCode : this.RESULT.SYSTEM_ERR.code,
            resultMsg : resultMsg
        };
        let body = {
            result: result,
            data: {}
        };
        return res.send(body);
    }
    catch(err)
    {
        console.error(err);
        return new Error("Can't make response data...");
    }
};
sendResponseFailSystemMassage = function(err, res) {
    try {

        let result;
        let resultMsg = '';

        if(err.code === undefined) {
            err.code = RESULT.SYSTEM_ERR.code;
        }
        if(err.code == 500){
            let massage = ''
            // console.log(err)
            massage = {
                errUrl : res.req.url,
                errMsg : (err.message).toString(),
                err : err.toString()
            }
            // console.log(massage)
            // bot.say({ text: JSON.stringify(massage,null,4), channel: 'C019RQC3TTR' });
            resultMsg = this.getErrorString(err.code);
            result = {
                resultCode : err.code,
                resultMsg : resultMsg
            };
            let body = {
                result: result
            };
            return res.send(body);
        }else{
            sendResponseFailSystem(err.code,res)
        }

    }
    catch(err)
    {
        console.error(err);
        return new Error("Can't make response data...");
    }
};
sendResponseFailSystem = function(code, res) {
    try {
        let result;
        let resultMsg = '';

        if(code === undefined) {
            code = RESULT.SYSTEM_ERR.code;
        }

        resultMsg = this.getErrorString(code);
        result = {
            resultCode : code,
            resultMsg : resultMsg
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch(err)
    {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailExceptionController = function(err, res){
    try {
        let result;
        result = {
            resultCode : this.RESULT.SYSTEM_ERR.code,
            resultMsg : 'api controller error.'
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch(err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailExceptionService = function(err, res){
    try {
        let result;
        result = {
            resultCode : this.RESULT.SYSTEM_ERR.code,
            resultMsg : 'api service error.'
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch(err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFailAuth = function(res) {
    try {
        let result;
        result = {
            resultCode : this.RESULT.UNAUTHORIZED.code,
            resultMsg : 'unauthorized.'
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch(err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

sendResponseFail = function(code, res) {
    try {
        let result = {};

        if(code === undefined) {
            code = RESULT.SYSTEM_ERR.code;
        }

        result = {
            resultCode : this.checkErrorCode(code),
            resultMsg : this.getErrorString(code)
        };
        let body = {
            result: result
        };
        return res.send(body);
    }
    catch(err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};



module.exports = {
    RESULT,
    RESULT_ENUM,
    sendResponseData,
    METHOD_TYPE,
    RESULT_VALID_CID,
    checkErrorCode,
    checkAuthItemErrorCode,
    getErrorString,
    getAuthItemErrorString,
    checkValidationToken,
    sendResponseResult,
    sendResponseBody,
    sendResponseFailDataCid,
    sendResponseFailDataNotCId,
    sendResponseFailDataParameter,
    sendResponseFailData,
    sendResponseFailSystem,
    sendResponseFailSystemMassage,
    sendResponseFailExceptionController,
    sendResponseFailExceptionService,
    sendResponseFailAuth,
    sendResponseFail
};
