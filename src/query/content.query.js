addContent = (contentId,status,sort,type,category,isTop,title,contentText,link
) => {
    let setPram = ``
    let setValue = ``
    let setDu = ``
    if (sort){
        setPram += `, sort `
        setValue += `, ${sort} `
        setDu += `, sort = '${sort}'`
    }else{
        setDu += `, sort = NULL`
    }
    if(title){
        title = title.replaceAll('\'','\\\'')
    }
    if(contentText){
        contentText = contentText.replaceAll('\'','\\\'')
    }
    console.log(contentText)
    return `
    INSERT INTO \`gpjw\`.tb_content (
            content_id
            , status
            ${setPram}
            , type
            , category
            , is_top
            , title
            , content_text
            , link
            , date_reg
        )
        VALUES (
            '${contentId}'
            ${setValue}
            , '${status}'
            , '${type}'
            , '${category}'
            , '${isTop}'
            , '${title}'
            , '${contentText}'
            , '${link}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
            
             date_last = NOW()
             ${setDu}
             , status = '${status}'
             , type = '${type}'
             , category = '${category}'
             , is_top = '${isTop}'
             , title = '${title}'
             , content_text = '${contentText}'
             , link = '${link}'
        ;`;
};
unActiveContent = (contentId,status
) => {

    return `
        UPDATE gpjw.tb_content
        SET
            status = '${status}'
        WHERE content_id = '${contentId}'`;
};

addMonthContent = (contentId,status,sort,isTop,title
) => {
    let setPram = ``
    let setValue = ``
    let setDu = ``
    if (sort){
        setPram += `, sort `
        setValue += `, ${sort} `
        setDu += `, sort = '${sort}'`
    }else{
        setDu += `, sort = NULL`
    }
    if(title){
        title = title.replaceAll('\'','\\\'')
    }
    return `
    INSERT INTO \`gpjw\`.tb_month_sea (
            content_id
            , status
            ${setPram}
            , is_top
            , title
            , date_reg
        )
        VALUES (
            '${contentId}'
            ${setValue}
            , '${status}'
            , '${isTop}'
            , '${title}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
            
             date_last = NOW()
             ${setDu}
             , status = '${status}'
             , is_top = '${isTop}'
             , title = '${title}'
        ;`;
};
updateContentSortInfo = (contentId,sort
) => {

    return `
        UPDATE gpjw.tb_content
        SET
            sort = ${sort}
        WHERE content_id = '${contentId}'`;


};
updateMonthContentSortInfo = (contentId,sort
) => {

    return `
        UPDATE gpjw.tb_month_sea
        SET
            sort = ${sort}
        WHERE content_id = '${contentId}'`;


};
unActiveMonthContent = (contentId,status
) => {

    return `
        UPDATE gpjw.tb_month_sea
        SET
            status = '${status}'
        WHERE content_id = '${contentId}'`;
};

getContentList = (bTotalCount,contentId,title,type,status,numOfRows,offset) => {
    let select = '';
    let limit = '';
    let whereContentId = ``;
    let whereStatus = '';
    let whereType = '';
    let whereTitle = '';
    let addSelect = ``;
    if(contentId){
        whereContentId = `AND tc.content_id = ${contentId}`
        addSelect = `, tc.content_text as contentText`
    }
    if(type){
        whereType = `AND tc.type = ${type}`

    }
    if(title){
        whereTitle = `AND tc.title like '%${title}%'`
    }
    if(status){
        whereStatus = `AND tc.status = ${status}`
    }
    // if(dateFrom !== undefined && dateFrom !== '') {
    //     whereDate += ` AND tt.date_reg >= '${dateFrom} 00:00:00'`;
    // }
    // if(dateTo !== undefined && dateTo !== '') {
    //     whereDate += ` AND tt.date_reg <= '${dateTo} 23:59:59'`;
    // }

    if(bTotalCount === true) {
        select = `COUNT(tc.content_id) AS totalCount`;
    }else {
        select = `
           tc.no
           , tc.content_id as contentId
           , tc.status
           , tc.sort
           , tc.type
           , tc.title
           , tc.link
           , tc.is_top as isTop
           , tc.category as category
           ${addSelect}
           , tci.url as imgUrl
           , tc.date_last as dateLast
           , tc.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_content tc
    LEFT JOIN (select * from \`gpjw\`.tb_content_img where type=1) tci on tci.content_id = tc.content_id
    WHERE 1=1
    ${whereStatus}
    ${whereContentId}
    ${whereType}
    ${whereTitle}
    AND tc.status != 3
    ORDER BY tc.is_top desc, tc.sort IS NULL ASC ,tc.sort , tc.no desc
    ${limit}
    `;
};

getMonthContentList = (bTotalCount,contentId,title,status,numOfRows,offset) => {
    let select = '';
    let limit = '';
    let whereContentId = ``;
    let whereStatus = '';
    let whereType = '';
    let whereTitle = '';
    if(contentId){
        whereContentId = `AND tc.content_id = ${contentId}`
    }
    if(title){
        whereTitle = `AND tc.title like '%${title}%'`
    }
    if(status){
        whereStatus = `AND tc.status = ${status}`
    }
    if(bTotalCount === true) {
        select = `COUNT(tc.content_id) AS totalCount`;
    }else {
        select = `
           tc.no
           , tc.content_id as contentId
           , tc.status
           , tc.sort
           , tc.title
           , tci.url as imgUrl
           , tc.is_top as isTop
           , tc.date_last as dateLast
           , tc.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_month_sea tc
    LEFT JOIN (select * from \`gpjw\`.tb_month_sea_img where type=1) tci on tci.content_id = tc.content_id
    WHERE 1=1
    ${whereStatus}
    ${whereContentId}
    ${whereType}
    ${whereTitle}
    AND tc.status != 3
    ORDER BY tc.is_top desc, tc.sort IS NULL ASC ,tc.sort , tc.no desc
    ${limit}
    `;
};

getEmartList = (searchKeyword) => {
    let select = '';
    let limit = '';
    let whereSearchKeyword = ``
    if(searchKeyword){
        whereSearchKeyword = ` AND (tei.name like '%${searchKeyword}%' or tei.address like '%${searchKeyword}%') `
    }
    select = `
       tei.no
       , tei.name as name
       , tei.address as address
       , tei.date_last as dateLast
       , tei.date_reg as dateReg
        
    `
    ;

    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_emart_info tei
    WHERE 1=1
    ${whereSearchKeyword}
    ORDER BY tei.no asc 
    `;
};

deleteAppTransaction = (uid,txId,active
) => {

    return `
    UPDATE \`content\`.tb_transaction
	SET
        active = '${active}',
		date_last = NOW()
	WHERE tx_id = '${txId}'
        ;`;
};

addTransactionImage = (imageId, txId, uid, url, webhookId
) => {

    return `
    INSERT INTO \`content\`.tb_transaction_image (
              image_id
            , tx_id
            , uid
            , url
            , webhook_avatar_Id
            , date_reg
        )
        VALUES (
            '${imageId}'
            , '${txId}'
            , '${uid}'
            , '${url}'
            , '${webhookId}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
             date_last = NOW()
        ;`;
};

getContentImg = (contentId) => {
    let select = '';
    let whereContentId = ``;

    if(contentId){
        whereContentId = `AND tci.content_id = '${contentId}'`
    }
    select = `
          tci.no
        , tci.url as url
        , tci.type as type
        , tci.date_last as dateLast
        , tci.date_reg as dateReg
    `
    ;


    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_content_img tci
    
    WHERE 1=1
    ${whereContentId}
    
    ORDER BY tci.type desc,tci.no desc
    `;
};
getMonthContentImg = (contentId) => {
    let select = '';
    let whereContentId = ``;

    if(contentId){
        whereContentId = `AND tci.content_id = '${contentId}'`
    }
    select = `
          tci.no
        , tci.url as url
        , tci.type as type
        , tci.date_last as dateLast
        , tci.date_reg as dateReg
    `
    ;


    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_month_sea_img tci
    
    WHERE 1=1
    ${whereContentId}
    
    ORDER BY tci.no desc
    `;
};
addContentImg = (contentId,media) => {
    let queryValues = ``;

    for(let i=0; i<media.length; i++) {
        if(i !== 0) {
            queryValues += `,`
        }

        queryValues += `(
        '${contentId}'
        , '${media[i].dateDir}'
        , '${media[i].serialNo}'
        , '${media[i].env}'
        , '${media[i].etag}'
        , '${media[i].url}'
        , ${media[i].type}
        , NOW()
        )`
    }

    return `INSERT INTO
                \`gpjw\`.tb_content_img (
                                                  content_id
                                                , date_dir
                                                , serialno
                                                , env
                                                , etag
                                                , url
                                                , type
                                                , date_reg
    )
            VALUES
                ${queryValues}
    ;`;
};
addMonthContentImg = (contentId,media) => {
    let queryValues = ``;

    for(let i=0; i<media.length; i++) {
        if(i !== 0) {
            queryValues += `,`
        }

        queryValues += `(
        '${contentId}'
        , '${media[i].dateDir}'
        , '${media[i].serialNo}'
        , '${media[i].env}'
        , '${media[i].etag}'
        , '${media[i].url}'
        , ${media[i].type}
        , NOW()
        )`
    }

    return `INSERT INTO
                \`gpjw\`.tb_month_sea_img (
                                                  content_id
                                                , date_dir
                                                , serialno
                                                , env
                                                , etag
                                                , url
                                                , type
                                                , date_reg
    )
            VALUES
                ${queryValues}
    ;`;
};
updateContentMediaMainclear = (contentId,type) => {
    let whereMain = ``;
    let set = ``
    if(type == 1){
        set = `type = 0`
        whereMain = ` AND type = 1`
    }else if(type==2){
        set = `type = 0`
        whereMain = ` AND type = 2`
    }
    return `UPDATE
                \`gpjw\`.tb_content_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND content_id = '${contentId}'
                ${whereMain}
    ;`;
};
updateMonthContentMediaMainclear = (contentId,type) => {
    let whereMain = ``;
    let set = ``
    if(type == 1){
        set = `type = 0`
        whereMain = ` AND type = 1`
    }else if(type==2){
        set = `type = 0`
        whereMain = ` AND type = 2`
    }
    return `UPDATE
                \`gpjw\`.tb_month_sea_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND content_id = '${contentId}'
                ${whereMain}
    ;`;
};
updateContentMedia = (contentId,serialNo, type) => {
    let set = ``
    set = ` type = ${type} `

    return `UPDATE
                \`gpjw\`.tb_content_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND content_id = '${contentId}'
              AND serialNo IN (${serialNo})
    ;`;
};
updateMonthContentImg = (contentId,serialNo, type) => {
    let set = ``
    set = ` type = ${type} `

    return `UPDATE
                \`gpjw\`.tb_month_sea_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND content_id = '${contentId}'
              AND serialNo IN (${serialNo})
    ;`;
};

deleteContentMedia = (contentId, serialNo
) => {

    return `
    DELETE FROM \`gpjw\`.tb_content_img
    WHERE 1=1
      AND content_id = '${contentId}'
      AND serialNo = '${serialNo}'
        ;`;
};
deleteMonthContentImg = (contentId, serialNo
) => {

    return `
    DELETE FROM \`gpjw\`.tb_month_sea_img
    WHERE 1=1
      AND content_id = '${contentId}'
      AND serialNo = '${serialNo}'
        ;`;
};
retryCountUp = (txId,status) => {
    let whereTxId = ``;
    let whereTicket = ``
    if(txId){
        whereTxId = `AND tt.tx_id = '${txId}'`
    }

    let updateQuery = ``
    if(status == 5){
        updateQuery = `tt.model_request_retry_count = tt.model_request_retry_count + 1`

    }else{
        updateQuery = `tt.model_failed_retry_count = tt.model_failed_retry_count + 1`
    }



    return `
    UPDATE \`content\`.tb_transaction tt
    SET
        ${updateQuery}
    WHERE 1=1
        ${whereTxId}
    `;
};
retryImageCountUp = (txId,styleId,styleIdx) => {
    let whereTxId = ``;
    let whereTicket = ``




    return `
    UPDATE \`content\`.tb_webhook_avatar twa
    SET
        twa.avatar_retry_count = twa.avatar_retry_count + 1
    WHERE 1=1
        AND twa.tx_id = ${txId}
        AND twa.style_id = ${styleId}
        AND twa.style_idx = ${styleIdx}
    `;
};

addMonthLink = (link,btnText
) => {

    return `
    INSERT INTO \`gpjw\`.tb_month_sea_link (
            link
            , btn_text
            , date_reg
        )
        VALUES (
            '${link}'
            ,'${btnText}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
             date_last = NOW()
             , link = '${link}'
             , btn_text = '${btnText}'
        ;`;
};
getMonthLink = () => {
    let select = '';
    let limit = '';


    select = `
           tmsl.no
           , tmsl.link
           , tmsl.btn_text as btnText
           , tmsl.date_last as dateLast
           , tmsl.date_reg as dateReg
            
        `
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_month_sea_link tmsl
    ORDER BY tmsl.no desc
    limit 1
    `;
};
module.exports = {
    addContent,
    unActiveContent,
    addMonthContent,
    unActiveMonthContent,
    updateContentSortInfo,
    updateMonthContentSortInfo,

    getContentList,
    getMonthContentList,
    getEmartList,
    getContentImg,
    getMonthContentImg,
    addContentImg,
    addMonthContentImg,
    updateContentMediaMainclear,
    updateMonthContentMediaMainclear,
    updateContentMedia,
    updateMonthContentImg,
    deleteContentMedia,
    deleteMonthContentImg,
    deleteAppTransaction,

    retryCountUp,
    retryImageCountUp,

    addMonthLink,
    getMonthLink,
};
