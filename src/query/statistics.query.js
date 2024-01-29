const moment = require('moment');

let path_config = '';
switch(process.env.NODE_ENV) {
    case 'prod':
        path_config = __dirname + '/../config/live.config.js';
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

getStatistics = () => {
    return `SELECT
  (SELECT count(*) FROM \`dmplus.block\`.tb_authno ta where ta.status = 4 and LENGTH(ta.type) = 1 and date_format(ta.date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as appAuthOk,
  (SELECT count(*) FROM \`dmplus.block\`.tb_authno ta where ta.status = 11 and LENGTH(ta.type) = 1 and date_format(ta.date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as appAuthExpire,
  (SELECT count(*) FROM \`dmplus.block\`.tb_authno ta where ta.status = 4 and LENGTH(ta.type) = 2 and date_format(ta.date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as webAuthOk,
  (SELECT count(*) FROM \`dmplus.block\`.tb_authno ta where ta.status = 5 and LENGTH(ta.type) = 2 and date_format(ta.date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as webAuthFail,
  (SELECT count(*) FROM \`dmplus.block\`.tb_authno ta where ta.status = 11 and LENGTH(ta.type) = 2 and date_format(ta.date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as webAuthExpire,
  (SELECT count(*) FROM \`dmplus.block\`.tb_payment where status = 2 and date_format(date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as paymentOk,
  (SELECT count(*) FROM \`dmplus.block\`.tb_payment where status = 3 and date_format(date_reg,'%Y-%m-%d')=date_format(now()- INTERVAL 1 DAY,'%Y-%m-%d')) as paymentFail
  ;`;
};


updateStatics = (web_auth_ok, web_auth_fail, web_auth_expire, app_auth_ok,app_auth_expire,payment_ok ,payment_fail ) => {
    let date = moment().subtract(1, "days").format("YYYY-MM-DD");

    return `INSERT INTO
        \`dmplus.block\`.tb_statistics_auth_v2 (
            \`date\`
          ,web_auth_ok
          ,web_auth_fail
          ,web_auth_expire
          ,app_auth_ok
          ,app_auth_expire
          ,payment_fail
          ,payment_ok
          ,date_last
          ,date_reg
        )
        VALUES (
            '${date}'
            , ${web_auth_ok}
            , ${web_auth_fail}
            , ${web_auth_expire}
            , ${app_auth_ok}
            , ${app_auth_expire}
            , ${payment_fail}
            , ${payment_ok}
            ,NOW()
            ,NOW()
        )
        ON DUPLICATE KEY UPDATE
           web_auth_ok = VALUES(web_auth_ok)
            , web_auth_fail = VALUES(web_auth_fail)
            , web_auth_expire = VALUES(web_auth_expire)
            , app_auth_ok = VALUES(app_auth_ok)
            , app_auth_expire = VALUES(app_auth_expire)
            , payment_ok = VALUES(payment_ok)
            , payment_fail = VALUES(payment_fail)
            , date_last = NOW()
        ;`;
};

module.exports = {
    getStatistics,
    updateStatics,
};
