const mysql = require('mysql2/promise');
let envConfigFile = '';
switch(process.env.NODE_ENV) {
    case 'live':
        envConfigFile = __dirname + '/../config/live.config';
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
const envConfig = require(envConfigFile);

appPool = function () {
    return mysql.createPool({
        connectionLimit: `${envConfig.DB.APP_DB.connectionLimit}`,
        host: `${envConfig.DB.APP_DB.host}`,
        user: `${envConfig.DB.APP_DB.user}`,
        password: `${envConfig.DB.APP_DB.password}`,
        database: `${envConfig.DB.APP_DB.database}`,
        port: `${envConfig.DB.APP_DB.port}`
    });
};

infoPool = function () {
    return mysql.createPool({
        connectionLimit: `${envConfig.DB.INFO_DB.connectionLimit}`,
        host: `${envConfig.DB.INFO_DB.host}`,
        user: `${envConfig.DB.INFO_DB.user}`,
        password: `${envConfig.DB.INFO_DB.password}`,
        database: `${envConfig.DB.INFO_DB.database}`,
        port: `${envConfig.DB.INFO_DB.port}`
    });
};

pushPool = function () {
    return mysql.createPool({
        connectionLimit: `${envConfig.DB.PUSH_DB.connectionLimit}`,
        host: `${envConfig.DB.PUSH_DB.host}`,
        user: `${envConfig.DB.PUSH_DB.user}`,
        password: `${envConfig.DB.PUSH_DB.password}`,
        database: `${envConfig.DB.PUSH_DB.database}`,
        port: `${envConfig.DB.PUSH_DB.port}`
    });
};

logPool = function () {
    return mysql.createPool({
        connectionLimit: `${envConfig.DB.LOG_DB.connectionLimit}`,
        host: `${envConfig.DB.LOG_DB.host}`,
        user: `${envConfig.DB.LOG_DB.user}`,
        password: `${envConfig.DB.LOG_DB.password}`,
        database: `${envConfig.DB.LOG_DB.database}`,
        port: `${envConfig.DB.LOG_DB.port}`
    });
};

// 개인 암호키 DB 추가     @ALEX - 2021.12.15
cipherPool = function () {
    return mysql.createPool({
        connectionLimit: `${envConfig.DB.CIPHER_DB.connectionLimit}`,
        host: `${envConfig.DB.CIPHER_DB.host}`,
        user: `${envConfig.DB.CIPHER_DB.user}`,
        password: `${envConfig.DB.CIPHER_DB.password}`,
        database: `${envConfig.DB.CIPHER_DB.database}`,
        port: `${envConfig.DB.CIPHER_DB.port}`
    });
};

module.exports = {
    appPool,
    infoPool,
    pushPool,
    logPool,
    cipherPool
};
