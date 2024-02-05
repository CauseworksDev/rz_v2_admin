checkDeviceAdid = (adid) => {
    return `SELECT
            adid,
            date_last AS dateLast,
            date_reg AS dateReg
        FROM \`dmplus.push\`.tb_device_token
        WHERE 1=1
            AND adid = '${adid}'
        ORDER BY \`no\` desc
        LIMIT 1
        ;`;
};
getToken = (email) => {
    return `
        SELECT 
            tdt.no,
            tu.email,
            tud.adid,
            tdt.token,
            tdt.date_last,
            tdt.date_reg
        FROM \`dmplus.app\`.tb_user tu
        left JOIN (SELECT uid, adid, date_last, date_reg
                   FROM \`dmplus.app\`.tb_user_device
                   order by date_last desc) tud on tu.uid = tud.uid
        left Join \`dmplus.push\`.tb_device_token tdt on tdt.adid = tud.adid
        WHERE 1=1
            AND tu.adid is not null
            AND tdt.token is not null
            AND tu.email = '${email}'
            AND tu.status = 1
        order by tud.date_last desc
        LIMIT 1
        ;`;
};

addDeviceAdid = (adid, token) => {
    return `INSERT INTO
        \`dmplus.push\`.tb_device_token (
            adid
            , token
            , date_reg
        )
        VALUES (
            '${adid}'
            , '${token}'
            , NOW()
        )
        ;`;
};

updateDeviceToken = (adid, token) => {
    return `UPDATE
        \`dmplus.push\`.tb_device_token
    SET 
        token = '${token}'
        , date_last = NOW()
    WHERE 1=1
    AND adid = '${adid}'
    ;`;
};

addPushMsgSingle = (email, type, topic, status, title, message) => {
    return `INSERT INTO
        \`dmplus.push\`.tb_push_msg (
              email
            , type
            , topic
            , status
            , title
            , message
            , date_reg
        )
        VALUES (
            '${email}'
            , '${type}'
            , '${topic}'
            , '${status}'
            , '${title}'
            , '${message}'
            , NOW()
        )
        ;`;
};

addPushMsgTopic = (type, category, status, serialNo, title, message, image) => {
    let objectType = {};
    let objectCategory = {};
    let objectStatus = {};
    let objectSerialNo = {};
    let objectTitle = {};
    let objectMessage = {};
    let objectImage = {};

    let first = true;
    let seperator = ', ';

    objectType.column = '';
    objectType.value = '';

    objectCategory.column = '';
    objectCategory.value = '';

    objectStatus.column = '';
    objectStatus.value = '';

    objectSerialNo.column = '';
    objectSerialNo.value = '';

    objectTitle.column = '';
    objectTitle.value = '';

    objectMessage.column = '';
    objectMessage.value = '';

    objectImage.column = '';
    objectImage.value = '';

    if(type) {
        first = false;
        objectType.column = `type`;
        objectType.value = `'${type}'`;
    }
    if(category) {
        if(first) {
            first = false;
        }
        else {
            objectCategory.column += seperator;
            objectCategory.value += seperator;
        }
        objectCategory.column += `category`;
        objectCategory.value += `'${category}'`;
    }
    if(status) {
        if(first) {
            first = false;
        }
        else {
            objectStatus.column += seperator;
            objectStatus.value += seperator;
        }
        objectStatus.column += `status`;
        objectStatus.value += `'${status}'`;
    }
    if(serialNo) {
        if(first) {
            first = false;
        }
        else {
            objectSerialNo.column += seperator;
            objectSerialNo.value += seperator;
        }
        objectSerialNo.column += `serialNo`;
        objectSerialNo.value += `'${serialNo}'`;
    }
    if(title) {
        if(first) {
            first = false;
        }
        else {
            objectTitle.column += seperator;
            objectTitle.value += seperator;
        }
        objectTitle.column += `title`;
        objectTitle.value += `'${title}'`
    }
    if(message) {
        if(first) {
            first = false;
        }
        else {
            objectMessage.column += seperator;
            objectMessage.value += seperator;
        }
        objectMessage.column += `message`;
        objectMessage.value += `'${message}'`;
    }
    if(image) {
        if(first) {
            first = false;
        }
        else {
            objectImage.column += seperator;
            objectImage.value += seperator;
        }
        objectImage.column += `image`;
        objectImage.value += `'${image}'`;
    }

    return `INSERT INTO
        \`dmplus.push\`.tb_push_msg (
            ${objectType.column}
            ${objectCategory.column}
            ${objectStatus.column}
            ${objectSerialNo.column}
            ${objectTitle.column}
            ${objectMessage.column}
            ${objectImage.column}
            , date_reg
        )
        VALUES (
            ${objectType.value}
            ${objectCategory.value}
            ${objectStatus.value}
            ${objectSerialNo.value}
            ${objectTitle.value}
            ${objectMessage.value}
            ${objectImage.value}
            , NOW()
        )
        ;`;
};

getPushHistory_v2 = (bTotalCount, email, topic, type,status, pageNo, numOfRows) => {
    let select = '';
    let limit = '';
    let whereStatus = '';
    let whereType = '';
    let whereEmail = '';
    let whereTopic = '';
    if(email){
        whereEmail =` AND tbm.email like "%${email}%"`
    }
    if(topic){
        whereTopic =` AND tbm.topic like "%${topic}%"`
    }
    if(type){
        whereType =` AND tbm.type = '${type}'`
    }
    if(status){
        whereStatus =` AND tbm.status = '${status}'`
    }
    if(bTotalCount === true) {
        select = `COUNT(tbm.email) AS totalCount`;
    }
    else {
        select = ` tbm.no,
                   tbm.email,
                   tbm.type,
                   tbm.topic,
                   tbm.status,
                   tbm.title,
                   tbm.message,
                   tbm.date_last as dateLast,
                   tbm.date_reg as dateReg`
        ;
        limit = `LIMIT ${pageNo}, ${numOfRows}`
    }

    return `
        SELECT
            ${select}
        FROM \`dmplus.push\`.tb_push_msg tbm
        WHERE 1 = 1
        ${whereStatus}
        ${whereEmail}
        ${whereTopic}
        ${whereType}
        ORDER BY tbm.no desc
        ${limit}
        
    ;`;
};

/***
 * # 마케팅 푸쉬 허용 상태 업데이트
 * @param state - 푸쉬 허용 상태
 */
updateMarketingAllow = (state) =>{
    let setDate = '';

    // 푸쉬 허용 상태에 따라 날짜 업데이트
    if (state){ // true(허용) - 허용 날짜 컬럼 업데이트
        setDate = `marketing_allow_date`

    }else { // false(거절) - 거절 날짜 컬럼 업데이트
        setDate = `marketing_reject_date`
    }

    return `UPDATE
        \`dmplus.push\`.tb_allow_state
    SET
        marketing = ?,
        ${setDate} = NOW()
    WHERE uid = ?
    ;`;

}


/***
 * # 푸쉬 허용 상태 조회
 */
selectPushState = () =>{
    return`SELECT 
       uid,
       marketing as marketingAllowState,
       DATE_FORMAT(marketing_allow_date,'%Y-%m-%d') as marketingAllowDate,
       DATE_FORMAT(marketing_reject_date,'%Y-%m-%d') as marketingRejectDate 
    FROM
        \`dmplus.push\`.tb_allow_state
    WHERE uid = ?
    ;`;

}


/***
 * # 초기 푸쉬 허용 상태 추가
 */
insertPushState = () =>{
    return`INSERT INTO \`dmplus.push\`.tb_allow_state(uid)
        VALUES (?)
    ;`;

}
addReservationPush = (pushId,message,title,adminTitle,dateReservation,status,
                      retryType,active,action1,action2,action3,requestTime,contentCategory,contentId,
                      dateRetryFrom,dateRetryTo
) => {
    let dateSetDuple = ``
    let dateSet = ``
    let dateSetVal = ``
    if(dateReservation){
        dateSet += ` , date_reservation `
        dateSetVal += ` , '${dateReservation} '`
        dateSetDuple += `, date_reservation = '${dateReservation}' `
    }
    if(dateRetryFrom){
        dateSet += ` , date_retry_from `
        dateSetVal += ` , '${dateRetryFrom} '`
        dateSetDuple += `, date_retry_from = '${dateRetryFrom}' `
    }
    if(dateRetryTo){
        dateSet += ` 
        , date_retry_to`
        dateSetVal += ` 
        , '${dateRetryTo}'`
        dateSetDuple += ` 
        , date_retry_to = '${dateRetryTo}' `

    }
    return `
    INSERT INTO \`dmplus.push\`.tb_push_reservation (
              push_id
            , status
            , retry_type
            , active
            , action1
            , action2
            , action3
            , request_time
            , admin_title
            , title
            , message
            , content_category
            , content_id
            ${dateSet}
            , date_reg
    )
        VALUES (
            '${pushId}'
            , '${status}'
            , '${retryType}'
            , '${active}'
            , '${action1}'
            , '${action2}'
            , '${action3}'
            , '${requestTime}'
            , '${adminTitle}'
            , '${title}'
            , '${message}'
            , '${contentCategory}'
            , '${contentId}'
            ${dateSetVal}
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
             push_id = ${pushId}
            , status = '${status}'
            , retry_type = '${retryType}'
            , active = '${active}'
            , action1 = '${action1}'
            , action2 = '${action2}'
            , action3 = '${action3}'
            , message = '${message}'
            , title = '${title}'
            , admin_title = '${adminTitle}'
            , request_time = '${requestTime}'
            , content_category = '${contentCategory}'
            , content_id = '${contentId}'
            ${dateSetDuple}
            , date_last = NOW()
        ;`;
};
updateReservationPushStatus = (pushId,status
) => {


    return `
      UPDATE \`dmplus.push\`.tb_push_reservation
	SET
		status = ${status}
	WHERE 
	    push_id = ${pushId}`;
};
getReservationPush = (bTotalCount,pageNo,numOfRows,pushId,status,dateReservation,retryType,active,nowDate,sendGroup,adminTitle,dateFrom,dateTo) => {
    let select = '';
    let limit = '';
    let wherePushId = ``;
    let whereStatus = '';
    let whereRetryType = '';
    let whereActive = '';
    let whereDateReservation = '';
    let whereNowDate = '';
    let whereAdminTitle = '';

    if(pushId){
        wherePushId = `AND tpr.push_id = '${pushId}'`
    }
    if(status){
        whereStatus = `AND tpr.status = '${status}'`
    }
    if(retryType){
        whereRetryType = `AND tpr.retry_type = '${retryType}'`
    }
    if(active){
        whereActive = `AND tpr.active = '${active}'`
    }
    if(dateReservation){
        whereDateReservation = `AND tpr.date_reservation <= '${dateReservation}'`
    }
    if(adminTitle){
        whereAdminTitle =` AND tpr.admin_title like "%${adminTitle}%" `
    }
    if(nowDate){
        whereNowDate += `AND tpr.date_retry_from <= '${nowDate}'`
        whereNowDate += `AND tpr.date_retry_to >= '${nowDate}'`
    }
    if(dateFrom){
        whereNowDate += `AND tpr.date_retry_from <= '${dateFrom}'`
    }
    if(dateTo){
        whereNowDate += `AND tpr.date_retry_to >= '${dateTo}'`
    }


    if(bTotalCount === true) {
        select = `COUNT(tpr.push_id) AS totalCount`;
    }else {
        select = `
                    tpr.no
                    , tpr.push_id as pushId
                    , tpr.status as status
                    , tpr.retry_type as retryType
                    , tpr.active as active
                    , tpr.action1
                    , tpr.action2
                    , tpr.action3
                    , tpr.admin_title as adminTitle
                    , tpr.title
                    , tpr.message
                    , tpr.content_category as contentCategory
                    , tpr.content_id as contentId
                    , tpr.request_time as requestTime
                    , tpr.date_last as dateLast
                    , tpr.date_reg as dateReg
                    , tpr.date_reservation as dateReservation
                    , tpr.date_retry_from as dateRetryFrom
                    , tpr.date_retry_to as dateRetryTo
        `
        ;
        limit = `LIMIT ${pageNo}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`dmplus.push\`.tb_push_reservation tpr
    
    WHERE 1=1
    ${whereStatus}
    ${wherePushId}
    ${whereDateReservation}
    ${whereRetryType}
    ${whereNowDate}
    ${whereActive}
    ${whereAdminTitle}
    ORDER BY tpr.no desc
    ${limit}
    `;
};
module.exports = {
    checkDeviceAdid,
    getToken,
    addDeviceAdid,
    updateDeviceToken,
    addPushMsgSingle,
    addPushMsgTopic,
    getPushHistory_v2,

    updateMarketingAllow,   // 마케팅 푸쉬 허용 상태 업데이트
    selectPushState,        // 푸쉬 허용 상태 조회
    insertPushState,        // 초기 푸쉬 허용 상태 추가

    addReservationPush,        // 예약 푸쉬 등록
    getReservationPush,        // 예약 푸쉬 정보
    updateReservationPushStatus,// 푸쉬 상태 업데이트
};
