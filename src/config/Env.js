const path = require("path");

class Env {

    constructor(){
        this.NODE_ENV = process.env.NODE_ENV
    }

    systemConfigPath(){
        let config_file
        switch (this.NODE_ENV) {
            case "prod":
                config_file = path.resolve(__dirname, '..', 'config', 'prod.config.js');
                break;
            case "qc":
                config_file = path.resolve(__dirname, '..', 'config', 'qc.config.js');
                break;
            case "test":
                config_file = path.resolve(__dirname, '..', 'config', 'dev.config.js');
                break;
            case "dev":
                config_file = path.resolve(__dirname, '..', 'config', 'dev.config.js');
                break;
            case "local":
                config_file = path.resolve(__dirname, '..', 'config', 'local.config.js');
                break;
            default:
                config_file = path.resolve(__dirname, '..', 'config', 'dev.config.js');
        }
        return config_file;
    }
}

module.exports = new Env()