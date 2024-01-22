const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const queryService = require('../query/logs.query');
const utilCreateId = require('../middleware/createId');


addLogs = async (logId,logText) => {


    if (!logId){
        logId =  await utilCreateId.createId(9);
    }

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addLogs(logId,logText);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return true

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
module.exports = {
    addLogs,

}