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
    access: '444D5714495683BA865BBA180C48B3E0', // test, qc
    // access: '60A77AED4AE74DD67CFF13D5E2C934F0', // prod
    cert: '739C04365DB3F38543DD686F08419B3C'
};

const AWS = {
    AIVI_IAM : {
        accessKeyId: 'AKIAU6AOQZCUMP76Y56R',
        secretAccessKey: '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',
        region: 'ap-northeast-2'
    }
};

module.exports = {
    DB,
    TOKEN_PRIVATE_KEY,
    AWS,
};
