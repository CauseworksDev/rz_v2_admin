const schedule = require('node-schedule');
const statisticsController = require('./statistics.controller');
const moment = require('moment');


jobStaticsStatus = () => {
    let period = '';
    if(process.env.NODE_ENV === 'prod') {
        period = '*/60 * * * * *';
    }
    else {
        // period = '0 0 * * * ';
        period = '*/60 * * * * *';
    }

    schedule.scheduleJob(`${period}`, async () => {
        console.log(process.env.NODE_ENV,"환경 스케쥴러 시작", moment().format("YYYY-MM-DD HH:mm:ss"));
        // await statisticsController.handleJobStatistics();
    });
};


module.exports = {
    jobStaticsStatus,
};
