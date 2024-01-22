const AWS = require("aws-sdk");

class AwsModule {

    constructor() {
        this.bucketName = 'imagineit-image'
    }

    /***
     * S3 이미지 업로드
     * @param image
     * @param objectKey - s3 객체 키값
     * @returns {Promise<S3.PutObjectOutput & {$response: Response<S3.PutObjectOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
     */
    uploadImageS3 = async (image, objectKey) => {
        const s3 = new AWS.S3();
        const imgBase64 = await Buffer.from(image, 'base64')
        try {
            let uploadParams = {
                Bucket: this.bucketName,
                Key: `${process.env.NODE_ENV}/${objectKey}`,
                Body: imgBase64,
                ContentEncoding: 'base64',
                ContentType: 'image/png'
            }
            return await s3.putObject(uploadParams).promise()

        } catch (e) {
            throw e
        }
    }

    /***
     * S3 이미지 삭제
     * @param objectPath - 키 객체의 상위 객체(트랜잭션 객체)
     * @returns {Promise<void>}
     */
    deleteImageS3 = async (objectPath) => {
        const s3 = new AWS.S3();
        try {
            const bucketName = this.bucketName;
            const directoryName = `${process.env.NODE_ENV}/${objectPath}/`;

            s3.listObjects({
                Bucket: bucketName,
                Prefix: directoryName
            }, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    const objects = data.Contents.map(function(object) {
                        return { Key: object.Key };
                    });

                    s3.deleteObjects({
                        Bucket: bucketName,
                        Delete: { Objects: objects }
                    }, function(err, data) {
                        if (err) {
                            console.log(err, err.stack);
                        } else {
                            console.log(`Deleted objects: ${JSON.stringify(data.Deleted)}`);
                        }
                    });
                }
            });

        } catch (e) {
            throw e
        }
    }

    /***
     * S3 객체 내 파일들 signed URL 조회
     * @param objectPath - 키 객체의 상위 객체(트랜잭션 객체)
     * @returns {Promise<[]>}
     */
    getImagesUrlS3 = async (objectPath) => {
        const s3 = new AWS.S3();
        try {
            //* 버켓의 객체 리스트 출력
            let objectList = [];
            await s3
                .listObjectsV2({Bucket: this.bucketName, Prefix:`${process.env.NODE_ENV}/${objectPath}/`})
                .promise()
                .then((data) => {
                    for (let i of data.Contents) {
                        objectList.push(i.Key);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            //* 객체의 서명된 URL 출력
            let signedUrlList = [];
            for (let key of objectList) {
                await s3
                    .getSignedUrlPromise('getObject', {
                        Bucket: this.bucketName,
                        Key: key,
                        Expires: 18000, // 18000초(5시간) 동안만 URL 유지
                    })
                    .then((data) => {
                        signedUrlList.push(data)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            return signedUrlList

        } catch (e) {
            throw e
        }
    }

}

module.exports = new AwsModule()