const generateRandomNumber = async (length) => {
    try {
        let random = 0;
        let max = 0;
        let min = 0;

        max = Math.pow(10, length);
        max = max - 1;
        min = Math.pow(10, length - 1);
        random = Math.floor(Math.random() * (max - min)) + min;

        return random;
    }
    catch(err) {
        throw err;
    }
};

const generateRandomHex = async (length) => {
    try {
        let random = '';
        let char = '';

        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let i=0;
        for(; i<length; i++) {
            char = possible.charAt(Math.floor(Math.random() * possible.length));
            random += char;
        }

        return random;
    }
    catch(err) {
        throw err;
    }
};

const randomString = function async (len, an){
    an = an && an.toLowerCase();
    let str="";
    let i=0;
    let min = an === 'a' ? 10 : 0;
    let max = an === 'n' ? 10 : 62;

    for(;i++<len;){
        let r = Math.random()*(max-min)+min << 0;
        str += String.fromCharCode(r += r>9 ? r<36 ? 55 : 61 : 48);
    }
    return str;
};



module.exports = {
    generateRandomNumber,
    generateRandomHex,

};