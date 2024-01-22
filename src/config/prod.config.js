const DB = {
    APP_DB: {
        connectionLimit: 500,
        host: 'gpjw-dev-db.c9t7y3dywl1w.ap-northeast-2.rds.amazonaws.com',
        user: 'admin_user',
        password: 'cjtj8dnjf',
        database: 'gpjw',
        port: '3306'
    },
};

const TOKEN_PRIVATE_KEY = {
    access: '60A77AED4AE74DD67CFF13D5E2C934F0',
    cert: '739C04365DB3F38543DD686F08419B3C'
};

const AWS = {
    AIVI_IAM : {
        accessKeyId: 'AKIA2HKCKZ25M7DYR6U4',
        secretAccessKey: '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',
        region: 'us-west-1'
    }
};
module.exports = {
    DB,
    TOKEN_PRIVATE_KEY,
    AWS,
};
