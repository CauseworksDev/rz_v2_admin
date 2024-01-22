const getCurrentDate = async (length) => {
    try {
        let curDate = new Date();
        let month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let day = ("0" + curDate.getDate()).slice(-2);
        let year = curDate.getFullYear().toString().substr(-2);

        let date = {};
        date.year = year;
        date.month = month;
        date.day = day;

        return date;
    }
    catch(err) {
        throw err;
    }
};

const getCurrentTime = async () => {
    try {
        let curDate = new Date();
        let hour = ("0" + curDate.getHours()).slice(-2);
        let minute = ("0" + curDate.getMinutes()).slice(-2);
        let second = ("0" + curDate.getSeconds()).slice(-2);
        let mseccond = ("0" + curDate.getMilliseconds()).slice(-2);

        let time = {};
        time.hour = hour;
        time.minute = minute;
        time.second = second;
        time.mseccond = mseccond;

        return time;
    }
    catch(err) {
        throw err;
    }
};

const getCurrentDateTime = async () => {
    try {
        let curDate = new Date();
        let month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let day = ("0" + curDate.getDate()).slice(-2);
        let year = curDate.getFullYear().toString().substr(-2);

        let hour = ("0" + curDate.getHours()).slice(-2);
        let minute = ("0" + curDate.getMinutes()).slice(-2);
        let second = ("0" + curDate.getSeconds()).slice(-2);
        let mseccond = ("0" + curDate.getMilliseconds()).slice(-2);

        let dateTime = {};
        dateTime.year = year;
        dateTime.month = month;
        dateTime.day = day;
        dateTime.hour = hour;
        dateTime.minute = minute;
        dateTime.second = second;
        dateTime.mseccond = mseccond;

        return dateTime;
    }
    catch(err) {
        throw err;
    }
};

const getCurrentDateTimeToString = async () => {
    try {
        let curDate = new Date();
        let month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let day = ("0" + curDate.getDate()).slice(-2);
        let year = curDate.getFullYear().toString().substr(-2);

        let hour = ("0" + curDate.getHours()).slice(-2);
        let minute = ("0" + curDate.getMinutes()).slice(-2);
        let second = ("0" + curDate.getSeconds()).slice(-2);

        return year + month + day + hour + minute + second;
    }
    catch(err) {
        throw err;
    }
};

const getCurrentDateTimeToStringWithFormat = async (datetime) => {
    try {
        let dateTime = new Date(datetime);
        let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        let day = ("0" + dateTime.getDate()).slice(-2);
        let year = dateTime.getFullYear().toString();

        let hour = ("0" + dateTime.getHours()).slice(-2);
        let minute = ("0" + dateTime.getMinutes()).slice(-2);
        let second = ("0" + dateTime.getSeconds()).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    catch(err) {
        throw err;
    }
};

const getBillingEmailDateToStringWithFormat = async (datetime) => {
    try {
        let dateTime = new Date(datetime);
        let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        let day = ("0" + dateTime.getDate()).slice(-2);
        let year = dateTime.getFullYear().toString();

        return year + '.' + month + '.' + day;
    }
    catch(err) {
        throw err;
    }
};

// // 해당 월의 마지막 날짜
// getDateLast = async () => {
//     try {
//         let date = new Date()
//         let year = date.getFullYear()
//         let month = date.getMonth()
//
//         date.setMonth(month + 1)
//         let monthAfter = date.getMonth()
//         if (month + 1 < monthAfter){
//             date = new Date(year, month + 1, 0)
//         }
//         return date;
//     }catch (err) {
//         throw err
//     }
//
// }

// 현재 날짜의 시작, 종료 시간 폼
const getCurrentDateStartEndFormat = async (option, datetime) => {
    try {
        let dateTime = new Date(datetime);
        let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        let day = ("0" + dateTime.getDate()).slice(-2);
        let year = dateTime.getFullYear().toString();

        let hour = '';
        let minute = '';
        let second = '';
        if (option === 'start'){
            hour = '00'
            minute = '00'
            second = '00'

        }else if (option === 'end'){
            hour = '23'
            minute = '59'
            second = '59'
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    catch(err) {
        throw err;
    }
};


// 날짜 차이 계산
const getDateDiff = async (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return parseInt(Math.abs(diffDate / (1000 * 60 * 60 * 24))); // 밀리세컨 * 초 * 분 * 시 = 일
}
const getCurrentDateToString = async () => {
    try {
        let curDate = new Date();
        let month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let day = ("0" + curDate.getDate()).slice(-2);
        let year = curDate.getFullYear().toString();


        return `${year}-${month}-${day} `;
    }
    catch(err) {
        throw err;
    }
};
module.exports = {
    getCurrentDate,
    getCurrentTime,
    getCurrentDateTime,
    getCurrentDateTimeToString,
    getCurrentDateTimeToStringWithFormat,

    getBillingEmailDateToStringWithFormat,
    // getDateLast,
    getCurrentDateStartEndFormat,
    getDateDiff,
    getCurrentDateToString
};