const checkTypes = require('check-types');

class Parameter {
    constructor() {
    }

    async checkParameter(targetForm, params) {
        try {
            let len = Object.keys(targetForm).length;
            let cnt = 0;
            let value = '';
            let type = '';

            for(let key in targetForm) {
                value = params[key];
                if(value === undefined || value === '') {
                    break;
                }
                else {
                    type = targetForm[key].name;
                    if(type === 'Number') {
                        if(isNaN(value) === true && value !== 'ios' && value !== 'android') {
                            break;
                        }
                    }
                    else if(type === 'Array') {
                        if(checkTypes.array(value) === false) {
                            if(checkTypes.array(JSON.parse(value)) === false) {
                                break;
                            }
                        }
                    }
                    else if(type === 'Object') {
                        if(checkTypes.object(value) === false) {
                            if(checkTypes.object(JSON.parse(value)) === false) {
                                break;
                            }
                        }
                    }
                    cnt += 1;
                }
            }

            return len <= cnt;
        }
        catch(err) {
            return false;
        }
    }
}

module.exports = {
    Parameter,
};
