const DB = {
    APP_DB: {
        connectionLimit: 500,
        host: 'lgchemesg.crzwuyw6c5fz.ap-northeast-2.rds.amazonaws.com',
        user: 'admin',
        password: 'lgredtie1015',
        database: 'lgchemesg',
        port: '3306'
    },
};

const TOKEN_PRIVATE_KEY = {
    access: '444D5714495683BA865BBA180C48B3E0', // test, qc
    // access: '60A77AED4AE74DD67CFF13D5E2C934F0', // live
    cert: '739C04365DB3F38543DD686F08419B3C'
};

const AWS = {
    RZ_IAM : {
        accessKeyId: 'AKIAUYM5FGEKTPEWETME',
        secretAccessKey: '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',
    }
};

module.exports = {
    DB,
    TOKEN_PRIVATE_KEY,
    AWS,
};
