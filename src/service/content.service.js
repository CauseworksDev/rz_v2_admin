const db = require('../middleware/db.pool');
const dbApp = db.appPool();
const queryService = require('../query/content.query');
const fs = require('fs');
const request = require('request');;
const AWS = require('aws-sdk');
const awsModule = require('../module/Aws.module');
const moment = require("moment");
const utilCreateId = require('../middleware/createId');


addContent = async (contentId,status,sort,type,category,isTop,title,contentText,link) => {
    if (!contentId){
        contentId =  await utilCreateId.createId(5);
    }



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addContent(contentId,status,sort,type,category,isTop,title,contentText,link);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
unActiveContent = async (contentId,status) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.unActiveContent(contentId,status);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

addMonthContent = async (contentId,status,sort,isTop,title) => {
    if (!contentId){
        contentId =  await utilCreateId.createId(5);
    }



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addMonthContent(contentId,status,sort,isTop,title);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
unActiveMonthContent = async (contentId,status) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.unActiveMonthContent(contentId,status);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateContentSortInfo = async (sortInfo) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        for (const key in sortInfo) {
            // console.log(key,":",sortInfo[key])
            query = queryService.updateContentSortInfo(key,sortInfo[key]);
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
updateMonthContentSortInfo = async (sortInfo) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []

        for (const key in sortInfo) {
            // console.log(key,":",sortInfo[key])
            query = queryService.updateMonthContentSortInfo(key,sortInfo[key]);
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
addContentImg = async (contentId,media) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addContentImg(contentId,media);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
addMonthContentImg = async (contentId,media) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addMonthContentImg(contentId,media);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateContentMediaMainclear = async (contentId,type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateContentMediaMainclear(contentId,type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateMonthContentMediaMainclear = async (contentId,type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateMonthContentMediaMainclear(contentId,type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateContentMedia = async (contentId, arraySerialNo, type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateContentMedia(contentId, arraySerialNo, type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
updateMonthContentImg = async (contentId, arraySerialNo, type) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.updateMonthContentImg(contentId, arraySerialNo, type);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
deleteContentMedia = async (contentId, serialNo) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.deleteContentMedia(contentId, serialNo);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
deleteMonthContentImg = async (contentId, serialNo) => {



    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.deleteMonthContentImg(contentId, serialNo);
        [rows] = await connection.query(query);
        // console.log(query)

        await connection.commit();
        connection.release();

        return contentId.toString()

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}

getContentList = async (contentId,title,type,status,numOfRows,offset) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getContentList(true,contentId,title,type,status,numOfRows,offset);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getContentList(false,contentId,title,type,status,numOfRows,offset);
        [rows] = await connection.query(query);
        // console.log(query)


        let imageUrls = []

        if(contentId){
            query = queryService.getContentImg(contentId);
            [rows2] = await connection.query(query);
            // console.log(query)
            for (const idx in rows2) {
                imageUrls.push(rows2[idx].url)
            }
        }
        let resultData = {
            totalCount : totalCount,
            items : rows,
            imageUrls : imageUrls,
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
getMonthContentList = async (contentId,title,status,numOfRows,offset) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0
        query = queryService.getMonthContentList(true,contentId,title,status,numOfRows,offset);
        [rows] = await connection.query(query);
        totalCount = rows[0].totalCount

        query = queryService.getMonthContentList(false,contentId,title,status,numOfRows,offset);
        [rows] = await connection.query(query);
        // console.log(query)


        let imageUrls = []

        if(contentId){
            query = queryService.getContentImg(contentId);
            [rows2] = await connection.query(query);
            console.log(rows2)
            for (const idx in rows2) {
                imageUrls.push(rows2[idx].url)
            }
        }
        let resultData = {
            totalCount : totalCount,
            items : rows,
            imageUrls : imageUrls,
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
getContentImg = async (contentId) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0


        query = queryService.getContentImg(contentId);
        [rows] = await connection.query(query);


        let imageUrls = []

        // if(contentId){
        //     query = queryService.getContentImageList(contentId);
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
getMonthContentImg = async (contentId) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0


        query = queryService.getMonthContentImg(contentId);
        [rows] = await connection.query(query);


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
getEmartList = async (searchKeyword) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.getEmartList(searchKeyword);
        [rows] = await connection.query(query);

        // console.log(query)

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

            let fileContent = await fs.readFileSync(`${fileKey}.png`);
            console.log("파일 체크 : ", fileContent)
            console.log("파일 체크 길이 : ", fileContent.length)
            if(fileContent.length<100000){
                imageUpload(uid, url, fileIdx, txId, webhookId)
                return true
            }
            const params = {
                Bucket: "public-media-image",
                Key: `${process.env.NODE_ENV}/avatar/${uid}/${txId}/${fileKey}.png`,
                Body: fileContent   }
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


addMonthLink = async (link,btnText) => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []


        query = queryService.addMonthLink(link,btnText);
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

getMonthLink = async () => {

    const connection = await dbApp.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();
        let query = ``;
        let [rows] = []
        let [rows2] = []
        let [rows3] = []
        let totalCount = 0

        query = queryService.getMonthLink();
        [rows] = await connection.query(query);

        // console.log(query)

        await connection.commit();
        connection.release();


        return rows

    } catch (err) {
        await connection.rollback();
        connection.release();
        throw err
    }
}
module.exports = {
    getContentList,
    getMonthContentList,
    getContentImg,
    getMonthContentImg,
    getEmartList,
    addContent,
    unActiveContent,
    addMonthContent,
    unActiveMonthContent,
    updateContentSortInfo,
    updateMonthContentSortInfo,
    addContentImg,
    addMonthContentImg,
    updateContentMediaMainclear,
    updateMonthContentMediaMainclear,
    updateContentMedia,
    updateMonthContentImg,
    deleteContentMedia,
    deleteMonthContentImg,
    imageUpload,
    addImageDB,
    addMonthLink,
    getMonthLink,
}