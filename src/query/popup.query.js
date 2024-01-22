addPopup = (popupId,status,sort,title,link
) => {

    return `
    INSERT INTO \`gpjw\`.tb_popup (
            popup_id
            , status
            , title
            , link
            , date_reg
        )
        VALUES (
            '${popupId}'
            , '${status}'
            , '${title}'
            , '${link}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
            
             date_last = NOW()
             , status = '${status}'
             , title = '${title}'
             , link = '${link}'
        ;`;
};
unActivePopup = (popupId,status
) => {

    return `
        UPDATE gpjw.tb_popup
        SET
            status = '${status}'
        WHERE popup_id = '${popupId}'`;
};

updatePopupStatus = (
) => {

    return `
        UPDATE gpjw.tb_popup
        SET
            status = '2'
        WHERE 
            status != '3'
        `;
};

updatePopupSortInfo = (popupId,sort
) => {

    return `
        UPDATE gpjw.tb_popup
        SET
            sort = ${sort}
        WHERE popup_id = '${popupId}'`;


};


getPopupList = (bTotalCount,popupId,title,status,numOfRows,offset) => {
    let select = '';
    let limit = '';
    let wherePopupId = ``;
    let whereStatus = '';
    let whereType = '';
    let whereTitle = '';
    if(popupId){
        wherePopupId = `AND tp.popup_id = ${popupId}`
    }

    if(title){
        whereTitle = `AND tp.title like '%${title}%'`
    }
    if(status){
        whereStatus = `AND tp.status = ${status}`
    }

    if(bTotalCount === true) {
        select = `COUNT(tp.popup_id) AS totalCount`;
    }else {
        select = `
           tp.no
           , tp.popup_id as popupId
           , tp.status
           , tp.title
           , tp.link
           , tpi.url as imgUrl
           , tp.date_last as dateLast
           , tp.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_popup tp
    LEFT JOIN (select * from \`gpjw\`.tb_popup_img where type = 1) tpi on tpi.popup_id = tp.popup_id
    WHERE 1=1
    ${whereStatus}
    ${wherePopupId}
    ${whereType}
    ${whereTitle}
    AND tp.status != 3
    ORDER BY   tp.no desc
    ${limit}
    `;
};

getPopupImg = (popupId) => {
    let select = '';
    let wherePopupId = ``;

    if(popupId){
        wherePopupId = `AND tpi.popup_id = ${popupId}`
    }
    select = `
          tpi.no
        , tpi.url as url
        , tpi.type as type
        , tpi.date_last as dateLast
        , tpi.date_reg as dateReg
    `
    ;


    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_popup_img tpi
    
    WHERE 1=1
    ${wherePopupId}
    
    ORDER BY tpi.no desc
    `;
};
addPopupImg = (popupId,media) => {
    let queryValues = ``;

    for(let i=0; i<media.length; i++) {
        if(i !== 0) {
            queryValues += `,`
        }

        queryValues += `(
        '${popupId}'
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
                \`gpjw\`.tb_popup_img (
                                                  popup_id
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
updatePopupMediaMainclear = (popupId,type) => {
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
                \`gpjw\`.tb_popup_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND popup_id = '${popupId}'
                ${whereMain}
    ;`;
};
updatePopupMedia = (popupId,serialNo, type) => {
    let set = ``
    set = ` type = ${type} `

    return `UPDATE
                \`gpjw\`.tb_popup_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND popup_id = '${popupId}'
              AND serialNo IN (${serialNo})
    ;`;
};

deletePopupMedia = (popupId, serialNo
) => {

    return `
    DELETE FROM \`gpjw\`.tb_popup_img
    WHERE 1=1
      AND popup_id = '${popupId}'
      AND serialNo = '${serialNo}'
        ;`;
};

getPopupSet = () => {
    let select = '';


        select = `
           tbs.no
           , tbs.active as active
           , tbs.date_last as dateLast
           , tbs.date_reg as dateReg
            
        `
        ;

    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_popup_set tbs
    WHERE 1=1
    ORDER BY  tbs.no desc
    limit 1
    `;
};
addPopupSet = (active
) => {

    return `
    INSERT INTO \`gpjw\`.tb_popup_set (
            active
            , date_reg
        )
        VALUES (
            '${active}'
            , NOW()
        )
        ;`;
};
module.exports = {
    addPopup,
    unActivePopup,
    updatePopupStatus,
    updatePopupSortInfo,

    getPopupList,
    getPopupImg,
    addPopupImg,
    updatePopupMediaMainclear,
    updatePopupMedia,
    deletePopupMedia,

    getPopupSet,
    addPopupSet,
};
