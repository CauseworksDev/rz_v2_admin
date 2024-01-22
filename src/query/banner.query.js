addBanner = (bannerId,status,sort,title,link
) => {

    return `
    INSERT INTO \`gpjw\`.tb_banner (
            banner_id
            , status
            , title
            , link
            , date_reg
        )
        VALUES (
            '${bannerId}'
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

unActiveBanner = (bannerId,status
) => {

    return `
        UPDATE gpjw.tb_banner
        SET
            status = '${status}'
        WHERE banner_id = '${bannerId}'`;
};

updateBannerSortInfo = (bannerId,sort
) => {

    return `
        UPDATE gpjw.tb_banner
        SET
            sort = ${sort}
        WHERE banner_id = '${bannerId}'`;


};


getBannerList = (bTotalCount,bannerId,title,status,numOfRows,offset) => {
    let select = '';
    let limit = '';
    let whereBannerId = ``;
    let whereStatus = '';
    let whereType = '';
    let whereTitle = '';
    if(bannerId){
        whereBannerId = `AND tb.banner_id = ${bannerId}`
    }

    if(title){
        whereTitle = `AND tb.title like '%${title}%'`
    }
    if(status){
        whereStatus = `AND tb.status = ${status}`
    }

    if(bTotalCount === true) {
        select = `COUNT(tb.banner_id) AS totalCount`;
    }else {
        select = `
           tb.no
           , tb.banner_id as bannerId
           , tb.status
           , tb.title
           , tb.link
           , tb.sort
           , tbi.url as imgUrlPc
           , tbi2.url as imgUrlMo
           , tb.date_last as dateLast
           , tb.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_banner tb
    LEFT JOIN (select * from \`gpjw\`.tb_banner_img where type = 1) tbi on tbi.banner_id = tb.banner_id
    LEFT JOIN (select * from \`gpjw\`.tb_banner_img where type = 2) tbi2 on tbi2.banner_id = tb.banner_id
    WHERE 1=1
    ${whereStatus}
    ${whereBannerId}
    ${whereType}
    ${whereTitle}
    AND tb.status != 3
    ORDER BY tb.sort IS NULL ASC , tb.sort, tb.no desc
    ${limit}
    `;
};

getBannerImg = (bannerId) => {
    let select = '';
    let whereBannerId = ``;

    if(bannerId){
        whereBannerId = `AND tbi.banner_id = ${bannerId}`
    }
    select = `
          tbi.no
        , tbi.url as url
        , tbi.type as type
        , tbi.date_last as dateLast
        , tbi.date_reg as dateReg
    `
    ;


    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_banner_img tbi
    
    WHERE 1=1
    ${whereBannerId}
    
    ORDER BY tbi.no desc
    `;
};
addBannerImg = (bannerId,media) => {
    let queryValues = ``;

    for(let i=0; i<media.length; i++) {
        if(i !== 0) {
            queryValues += `,`
        }

        queryValues += `(
        '${bannerId}'
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
                \`gpjw\`.tb_banner_img (
                                                  banner_id
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
updateBannerMediaMainclear = (bannerId,type) => {
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
                \`gpjw\`.tb_banner_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND banner_id = '${bannerId}'
                ${whereMain}
    ;`;
};
updateBannerMedia = (bannerId,serialNo, type) => {
    let set = ``
    set = ` type = ${type} `

    return `UPDATE
                \`gpjw\`.tb_banner_img
            SET
                ${set}
              , date_last = NOW()
            WHERE 1=1
              AND banner_id = '${bannerId}'
              AND serialNo IN (${serialNo})
    ;`;
};

deleteBannerMedia = (bannerId, serialNo
) => {

    return `
    DELETE FROM \`gpjw\`.tb_banner_img
    WHERE 1=1
      AND banner_id = '${bannerId}'
      AND serialNo = '${serialNo}'
        ;`;
};

getBannerSet = () => {
    let select = '';


        select = `
           tbs.no
           , tbs.active as active
           , tbs.top
           , tbs.bottom
           , tbs.date_last as dateLast
           , tbs.date_reg as dateReg
            
        `
        ;

    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_banner_set tbs
    WHERE 1=1
    ORDER BY  tbs.no desc
    limit 1
    `;
};
addBannerSet = (active,top,bottom
) => {

    return `
    INSERT INTO \`gpjw\`.tb_banner_set (
            active
            , top
            , bottom
            , date_reg
        )
        VALUES (
            '${active}'
            , '${top}'
            , '${bottom}'
            , NOW()
        )
        ;`;
};
module.exports = {
    addBanner,
    unActiveBanner,
    updateBannerSortInfo,

    getBannerList,
    getBannerImg,
    addBannerImg,
    updateBannerMediaMainclear,
    updateBannerMedia,
    deleteBannerMedia,

    getBannerSet,
    addBannerSet,
};
