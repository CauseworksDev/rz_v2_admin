const responseCommon = require("../common/response");
const logsService = require("../service/logs.service");
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
// 로그 수집
addLogs = async (req, res, next) => {
    let result = {}
    let data = {}

    let logText = (!req.body.logText) ? "" : escapeHtml(req.body.logText);

    try {
        //로그 등록
        const resData = await logsService.addLogs("",logText)

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

module.exports = {
    addLogs,



}
