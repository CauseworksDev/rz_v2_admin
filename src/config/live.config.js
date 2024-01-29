const DB = {
    APP_DB: {
        connectionLimit: 500,
        //live
        host: 'database-1.crzwuyw6c5fz.ap-northeast-2.rds.amazonaws.com',
        user: 'admin',
        password: 'l8Re$Bdti2!01#',
        database: 'lgchemesg',
        port: '3306'
    },
};

const TOKEN_PRIVATE_KEY = {
    access: '60A77AED4AE74DD67CFF13D5E2C934F0',
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
