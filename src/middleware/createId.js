const utilRandom = require("./util.random");

createId = async (role) => {
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

        let tempId = role;
        tempId += year + month + day + hour + random;
        let id = parseInt(tempId);
        return id;
    }
    catch(err) {
        throw err;
    }
};

module.exports = {
    createId,

};