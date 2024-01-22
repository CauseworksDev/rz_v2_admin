const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const queryService = require('../query/popup.query');
const fs = require('fs');
const request = require('request');;
const AWS = require('aws-sdk');
const awsModule = require('../module/Aws.module');
const moment = require("moment");
const utilCreateId = require('../middleware/createId');


addPopup = async (popupId,status,sort,title,link) => {
    if (!popupId){
        popupId =  await utilCreateId.createId(7);
    }



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        if(status == 1){
            query = queryService.updatePopupStatus();
            [rows] = await connection.query(query);
        }

        query = queryService.addPopup(popupId,status,sort,title,link);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
unActivePopup = async (popupId,status) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        if(status == 1){
            query = queryService.updatePopupStatus();
            [rows] = await connection.query(query);
        }
        query = queryService.unActivePopup(popupId,status);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updatePopupSortInfo = async (sortInfo) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        for (const key in sortInfo) {
            // console.log(key,":",sortInfo[key])
            query = queryService.updatePopupSortInfo(key,sortInfo[key]);
            [rows] = await connection.query(query);
        }




        await connection.commit();
        connection.release();

        return true

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
addPopupImg = async (popupId,media) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addPopupImg(popupId,media);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updatePopupMediaMainclear = async (popupId,type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updatePopupMediaMainclear(popupId,type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updatePopupMedia = async (popupId, arraySerialNo, type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updatePopupMedia(popupId, arraySerialNo, type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
deletePopupMedia = async (popupId, serialNo) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.deletePopupMedia(popupId, serialNo);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return popupId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

getPopupList = async (popupId,title,status,numOfRows,offset) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getPopupList(true,popupId,title,status,numOfRows,offset);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getPopupList(false,popupId,title,status,numOfRows,offset);
        [rows] = await connection.query(query);


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
getPopupImg = async (popupId) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0


        query = queryService.getPopupImg(popupId);
        [rows] = await connection.query(query);


        let imageUrls = []

        // if(popupId){
        //     query = queryService.getPopupImageList(popupId);
        //     [rows2] = await connection.query(query);
        //     console.log(rows2)
        //     for (const idx in rows2) {
        //         imageUrls.push(rows2[idx].url)
        //     }
        // }
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

imageUpload = async (uid, url, fileIdx, txId, webhookId) => {
    try {

        let requestOptions  = { method: "GET"
            ,uri: url
            ,headers: { "User-Agent": "Mozilla/5.0" }
            ,encoding: null
        };
        let fileKey = await createId(8);
        let result = await request(requestOptions).pipe(await fs.createWriteStream(`${fileKey}.png`));
        await result.on('finish',async ()=>{

            let filePopup = await fs.readFileSync(`${fileKey}.png`);
            console.log("파일 체크 : ", filePopup)
            console.log("파일 체크 길이 : ", filePopup.length)
            if(filePopup.length<100000){
                imageUpload(uid, url, fileIdx, txId, webhookId)
                return true
            }
            const params = {
                Bucket: "public-media-image",
                Key: `${process.env.NODE_ENV}/avatar/${uid}/${txId}/${fileKey}.png`,
                Body: filePopup   }
            ;
            try {
                //이미지 업로드
                const stored = await s3.upload(params).promise()

                let resData = {
                    image : stored,
                    imageId : fileKey
                }
                await addImageDB(fileKey, txId, uid, stored.Location, webhookId)
                fs.unlink(`${fileKey}.png`,err => {
                    if(err) console.log('파일삭제 err : ',err)
                })
                return resData
            } catch (err) {

                console.log(err)
            }
        })

    } catch (err) {
        console.log("이미지 저장 에러 : ",err)
        throw err
    }
}
addImageDB = async (imageId, txId, uid, url, webhookId) => {
    try {
        const connection = await dbApp.getConnection(async conn => conn);
        try {
            await connection.beginTransaction();
            let query = ``;
            let [rows] = []

            query = queryService.addTransactionImage(imageId, txId, uid, url, webhookId);
            [rows] = await connection.query(query);

            await connection.commit();
            connection.release();

            return true
        } catch (err) {

            await connection.commit();
            connection.release();
            console.log(err)
        }


    } catch (err) {
        throw err
    }
}



getPopupSet = async () => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.getPopupSet();
        [rows] = await connection.query(query);

        let resultData = rows


        await connection.commit();
        connection.release();


        return resultData

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
addPopupSet = async (active) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.addPopupSet(active);
        [rows] = await connection.query(query);


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
    getPopupList,
    getPopupImg,
    addPopup,
    unActivePopup,
    updatePopupSortInfo,
    addPopupImg,
    updatePopupMediaMainclear,
    updatePopupMedia,
    deletePopupMedia,
    imageUpload,
    addImageDB,
    getPopupSet,
    addPopupSet,

}