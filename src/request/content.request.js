const requestCommon = require('../request/common.request');

const apiName = {
    requestImageToImage: 'requestImageToImage',
    requestAvatar: 'requestAvatar',
    requestGetTransaction: 'requestGetTransaction',
    requestGetAppTransactionList: 'requestGetAppTransactionList',
    requestGetAppTransactionDetail: 'requestGetAppTransactionDetail',
    requestDeleteAppTransaction: 'requestDeleteAppTransaction',
};

const requestGetTransaction = {

};

const requestImageToImage = {
    uid: String,
    prompt: String,
};
const requestGetAppTransactionList = {
    uid: String,
};
const requestGetAppTransactionDetail = {
    uid: String,
    txId: String,
};
const requestDeleteAppTransaction = {
    uid: String,
    txId: String,
};

const requestAvatar = {
    uid: String,
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
            case apiName.requestImageToImage:
                targetForm = requestImageToImage;
                break;
            case apiName.requestAvatar:
                targetForm = requestAvatar;
                break;
            case apiName.requestGetTransaction:
                targetForm = requestGetTransaction;
                break;
            case apiName.requestGetAppTransactionList:
                targetForm = requestGetAppTransactionList;
                break;
            case apiName.requestGetAppTransactionDetail:
                targetForm = requestGetAppTransactionDetail;
                break;
            case apiName.requestDeleteAppTransaction:
                targetForm = requestDeleteAppTransaction;
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

    requestImageToImage,
    requestAvatar,
    requestGetTransaction,
    requestGetAppTransactionList,
    requestDeleteAppTransaction,

    checkParamType
};
