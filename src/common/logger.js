const { createLogger, format, transports } = require("winston")

const env = process.env.LOG_ENV;
const log_level = env;

let transport_arr = [];
transport_arr.push(new transports.Console({
    level: log_level,
    format: format.combine(
        format.colorize(),
        format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`
        )
    )
}));

const logger = createLogger({
    level: env,
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.json()
    ),
    transports: transport_arr
});

module.exports = {
    logger: logger
}