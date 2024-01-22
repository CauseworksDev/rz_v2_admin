addLogs = (logId,logText
) => {

    return `
    INSERT INTO \`gpjw\`.tb_logs (
              log_id
            , logs
            , date_reg
        )
        VALUES (
            '${logId}'
            , '${logText}'
            , NOW()
        )
        ;`;
};


module.exports = {
    addLogs,

};
