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

const PRIVATE_KEY = {
    access: '444D5714495683BA865BBA180C48B3E0', // test, qc
    // access: '60A77AED4AE74DD67CFF13D5E2C934F0', // prod
    cert: '739C04365DB3F38543DD686F08419B3C'
};

const DEVICE_API_KEY = {
    // test, qc
    ios: {name: 'ios', key: '1F1EC73755CD51DC25FB85FF598B26946394889F410B4C2216DCD2EBFAFAE65E'},
    android: {name:'android', key: '93C40666927F694FF1BBF021DF64E14C78FF36C7C5B98FB166E7BB81F73313F8'}

    // prod
    // ios: {name: 'ios', key: '404638F421BD5951ABBFA84926B321DABCADA4F0D4CAF74BAB59EABF59153EEE'},
    // android: {name:'android', key: '1968F7560F3B3CF66F16B75228A9406B3D9FE92D117720E3BEDC3F0A44FAE6E4'}
};


const SERVERS = {
    api_blockchain: {
        protocol: 'http',
        domain: '',
        // domain: 'localhost',
        port: '5531'
    },
    api_push: {
        protocol: 'http',
        domain: '',
        port: '5123'
    },
    web:{
        protocol: 'http',
        domain: '127.0.0.1',
        port: '5225'
    },
    gateway: {
        protocol: 'http',
        domain: '127.0.0.1',
        port: '5013'
    }
};

const AWS = {
    SNS_SERVICE: {
        // accessKeyId: 'AKIA33FYHVS3JMKGQVDG',
        // secretAccessKey: '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',
        // region: 'ap-northeast-1',
        accessKeyId: 'AKIA2HKCKZ25PVLS6XE6',
        secretAccessKey: '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',
        region: 'ap-south-1'
    },
    SES_SERVICE: {
        accessKeyId: 'AKIA2HKCKZ25PVLS6XE6',
        secretAccessKey: '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',
        region: 'ap-south-1'
    },
    COGNITO: {
        region: 'ap-northeast-2',
        IdentityPoolId: 'ap-northeast-2:b5602728-3659-4a3b-a757-b967143fd17b',
    },
    IMAGE : {
        accessKeyId: 'AKIA2HKCKZ25AZMHLO56',
        secretAccessKey: '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',
        region: 'ap-south-1'
    },
    S3_SERVICE : {
        accessKeyId: 'AKIA2HKCKZ25AZMHLO56',
        secretAccessKey: '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',
        region: 'us-west-1'
    }
};

module.exports = {
    DB,
    PRIVATE_KEY,
    DEVICE_API_KEY,
    SERVERS,
    AWS,
};
