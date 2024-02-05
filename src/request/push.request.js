const requestCommon = require('../request/common.request');

const apiName = {
    requestAddDeviceToken: 'requestAddDeviceToken',
    requestPushToSingle: 'requestPushToSingle',
    requestPushToGroup: 'requestPushToGroup'
};

const requestAddDeviceToken = {
    adid: String,
    token: String
};
const requestPushToSingle = {
    title: String,
    message: String,
    email : String,
};

const requestPushToTopic = {
    title: String,
    message: String,
    // to: String,
};
checkParamType = (apiCmd, req) => {
    try {
        let targetForm = {};
        let params = {};

        if(req.method === "GET"){
            params = req.query;
        }
        else {
            params = req.body;
        }

        switch(apiCmd) {
            case apiName.requestAddDeviceToken:
                targetForm = requestAddDeviceToken;
                break;
            case apiName.requestPushToSingle:
                targetForm = requestPushToSingle;
                break;
            case apiName.requestPushToTopic:
                targetForm = requestPushToTopic;
                break;
        }

        const requestParameter = new requestCommon.Parameter();
        return requestParameter.checkParameter(targetForm, params);
    }
    catch(err) {
        return false;
    }
};

module.exports = {
    apiName,

    requestAddDeviceToken,
    requestPushToSingle,
    requestPushToTopic,

    checkParamType
};