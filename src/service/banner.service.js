const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const queryService = require('../query/banner.query');
const fs = require('fs');
const request = require('request');;
const AWS = require('aws-sdk');
const awsModule = require('../module/Aws.module');
const moment = require("moment");
const utilCreateId = require('../middleware/createId');


addBanner = async (bannerId,status,sort,title,link) => {
    if (!bannerId){
        bannerId =  await utilCreateId.createId(6);
    }



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addBanner(bannerId,status,sort,title,link);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
unActiveBanner = async (bannerId,status) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.unActiveBanner(bannerId,status);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateBannerSortInfo = async (sortInfo) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        for (const key in sortInfo) {
            // console.log(key,":",sortInfo[key])
            query = queryService.updateBannerSortInfo(key,sortInfo[key]);
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
addBannerImg = async (bannerId,media) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addBannerImg(bannerId,media);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateBannerMediaMainclear = async (bannerId,type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateBannerMediaMainclear(bannerId,type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateBannerMedia = async (bannerId, arraySerialNo, type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateBannerMedia(bannerId, arraySerialNo, type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
deleteBannerMedia = async (bannerId, serialNo) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.deleteBannerMedia(bannerId, serialNo);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return bannerId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

getBannerList = async (bannerId,title,status,numOfRows,offset) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getBannerList(true,bannerId,title,status,numOfRows,offset);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getBannerList(false,bannerId,title,status,numOfRows,offset);
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
getBannerImg = async (bannerId) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0


        query = queryService.getBannerImg(bannerId);
        [rows] = await connection.query(query);


        let imageUrls = []

        // if(bannerId){
        //     query = queryService.getBannerImageList(bannerId);
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

            let fileBanner = await fs.readFileSync(`${fileKey}.png`);
            console.log("파일 체크 : ", fileBanner)
            console.log("파일 체크 길이 : ", fileBanner.length)
            if(fileBanner.length<100000){
                imageUpload(uid, url, fileIdx, txId, webhookId)
                return true
            }
            const params = {
                Bucket: "public-media-image",
                Key: `${process.env.NODE_ENV}/avatar/${uid}/${txId}/${fileKey}.png`,
                Body: fileBanner   }
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



getBannerSet = async () => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.getBannerSet();
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
addBannerSet = async (active,top,bottom) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.addBannerSet(active,top,bottom);
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
    getBannerList,
    getBannerImg,
    addBanner,
    unActiveBanner,
    updateBannerSortInfo,
    addBannerImg,
    updateBannerMediaMainclear,
    updateBannerMedia,
    deleteBannerMedia,
    imageUpload,
    addImageDB,
    getBannerSet,
    addBannerSet,

}