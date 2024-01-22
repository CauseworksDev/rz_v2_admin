const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const queryService = require('../query/recycle.query');
const utilCreateId = require('../middleware/createId');


addRecycle = async (year,location,weightCoast,personnel,activeCount,dateLast) => {




    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addRecycle(year,location,weightCoast,personnel,activeCount,dateLast);
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
deleteRecycle = async (year,location) => {




    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.deleteRecycle(year,location);
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

getRecycleList = async (numOfRows,offset,year,location) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getRecycleList(true,numOfRows,offset,year,location);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getRecycleList(false,numOfRows,offset,year,location);
        [rows] = await connection.query(query);

        // console.log(query)
        let imageUrls = []


        let resultData = {
            totalCount : totalCount,
            items : rows,
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

getRecycleTotal = async (year,location) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.getRecycleTotal(year,location);
        [rows] = await connection.query(query);
        // console.log(query)


        let imageUrls = []


        let resultData = {
            items : rows,
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

addRecyclePet = async (weightPet,dateLast) => {


    let recycleId =  await utilCreateId.createId(7);

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addRecyclePet(recycleId,weightPet,dateLast);
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
getRecyclePetList = async (numOfRows,offset) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getRecyclePetList(true,numOfRows,offset);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getRecyclePetList(false,numOfRows,offset);
        [rows] = await connection.query(query);

        // console.log(query)
        let imageUrls = []


        let resultData = {
            totalCount : totalCount,
            items : rows,
        }

        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
module.exports = {
    getRecycleList,
    getRecycleTotal,
    addRecycle,
    deleteRecycle,
    addRecyclePet,
    getRecyclePetList,

}