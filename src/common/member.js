const utilRandom = require('../middleware/util.random');

const ROLE_MEMBER_TYPE = {
    NON: {no: 1, role: 'non'},
    CUSTOMER: {no: 2, role: 'customer'},
    BIZ: {no: 3, role: 'biz'},
    PLAYER: {no: 3, role: 'player'},
    ADMIN: {no: 4, role: 'admin'},
    BLOCK_CHAIN: {no: 5, role: 'block_chain'},
    SUPER: {no: 6, role: 'super'}
};

const MEMBER_STATUS = {
    NON: 1,
    SIGN_UP_ING: 2,
    SIGN_UP_COMPLETED: 3,
    SIGN_IN: 4,
    SIGN_OUT: 5,
    PASSKEY_CHANGE: 6,
    PASSPORT_REGISTER_ING: 7,
    PASSPORT_REGISTER_COMPLETED: 8,
    PASSPORT_REGISTER_RENEW: 9,
    SLEEP_ING: 10,
    BLOCKED: 11,
    RESIGNED: 12
};


const ACCESS_TOKEN_TIME = {
    SHORT: 365,
    LONG: 365
};

createCid = async (role) => {
    try {
        let curDate = new Date();
        let month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let day = ("0" + curDate.getDate()).slice(-2);
        let year = curDate.getFullYear().toString().substr(-2);
        let hour = ("0" + curDate.getHours()).slice(-2);
        //let minute = ("0" + curDate.getMinutes()).slice(-2);
        //let second = ("0" + curDate.getSeconds()).slice(-2);
        //let mseccond = ("0" + curDate.getMilliseconds()).slice(-2);

        let random = await utilRandom.generateRandomNumber(6);

        let tempCid = role;
        tempCid += year + month + day + hour + random;
        let cid = parseInt(tempCid);
        return cid;
    }
    catch(err) {
        throw err;
    }
};

module.exports = {
    ROLE_MEMBER_TYPE,
    MEMBER_STATUS,
    ACCESS_TOKEN_TIME,
    createCid
};
