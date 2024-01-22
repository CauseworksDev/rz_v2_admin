const urlConfig = require("../config.js");

exports.set = () => {



    switch (process.env.NODE_ENV) {
        case "qc":
            urlConfig.API_URL = ""
            urlConfig.WEB_URL = ""
            urlConfig.token_access= '444D5714495683BA865BBA180C48B3E0'
            urlConfig.SERVER = "qc"
            break;
        case "dev":
            urlConfig.API_URL = ""
            urlConfig.WEB_URL = ""
            urlConfig.token_access= '444D5714495683BA865BBA180C48B3E0'
            urlConfig.SERVER = "dev"
            break;
        case "local":
            urlConfig.API_URL = ""
            urlConfig.WEB_URL = ""
            urlConfig.token_access= '444D5714495683BA865BBA180C48B3E0'
            urlConfig.SERVER = "local"
            break;
        case "prod":
            urlConfig.API_URL = ""
            urlConfig.WEB_URL = ""
            urlConfig.token_access= '60A77AED4AE74DD67CFF13D5E2C934F0'
            urlConfig.SERVER = "prod"
            break;
        default:
            urlConfig.API_URL = ""
            urlConfig.WEB_URL = ""
    }
}

