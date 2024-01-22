addRecycle = (year,location,weightCoast,personnel,activeCount,dateLast
) => {

    return `
    INSERT INTO \`gpjw\`.tb_recycle_coast_info (
            active_count
            , year
            , location
            , weight_coast
            , personnel
            , date_last
            , date_reg
        )
        VALUES (
            '${activeCount}'
            , '${year}'
            , '${location}'
            , '${weightCoast}'
            , '${personnel}'
            , '${dateLast}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
            
             date_last = '${dateLast}'
             , active_count = '${activeCount}'
             , year = '${year}'
             , location = '${location}'
             , weight_coast = '${weightCoast}'
             , personnel = '${personnel}'
        ;`;
};
deleteRecycle = (year,location) => {

    return `
    DELETE FROM tb_recycle_coast_info 
    WHERE 1=1 
      AND \`year\`='${year}' 
      AND location='${location}'`;

};

getRecycleList = (bTotalCount,numOfRows,offset,year,location) => {
    let select = '';
    let limit = '';
    let whereStatus = '';
    let whereYear = '';
    let whereLocation = '';
    if(year){
        whereYear = `AND tri.year = '${year}'`
    }
    if(location){
        whereLocation = `AND tri.location = '${location}'`
    }



    if(bTotalCount === true) {
        select = `COUNT(tri.no) AS totalCount`;
    }else {
        select = `
           tri.no
           , tri.year as year
           , tri.location as location
           , tri.active_count as activeCount
           , tri.weight_coast as weightCoast
           , tri.personnel
           , tri.date_last as dateLast
           , tri.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_recycle_coast_info tri
    WHERE 1=1
    ${whereStatus}
    ${whereYear}
    ${whereLocation}
    ORDER BY   tri.no desc
    ${limit}
    `;
};
getRecycleTotal = (year,location) => {
    let select = '';
    let limit = '';
    let whereStatus = '';
    let whereYear = '';
    let whereLocation = '';
    let groupBy = ``
    if(year){
        whereYear = `AND tri.year = '${year}'`
        groupBy = `GROUP BY  tri.year`

    }
    if(location){
        whereLocation = `AND tri.location = '${location}'`
        if(groupBy){
            groupBy += ` ,tri.location`
        }else{
            groupBy = `GROUP BY tri.location`
        }

    }



    select = `
           tri.no
           , tri.year as year
           , tri.location as location
           , SUM(tri.active_count) as activeCount
           , SUM(tri.weight_coast) AS weightCoast
           , SUM(tri.personnel) AS personnel
           , max(tri.date_last) as dateLast
           , tri.date_reg as dateReg
            
        `
    ;

    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_recycle_coast_info tri
    WHERE 1=1
    ${whereStatus}
    ${whereYear}
    ${whereLocation}
    ${groupBy}
    ORDER BY   tri.no desc
        
    ${limit}
    `;
};

addRecyclePet = (recycleId,weightPet,dateLast
) => {

    return `
    INSERT INTO \`gpjw\`.tb_recycle_pet_info (
              recycle_id
            , weight_pet
            , date_last
            , date_reg
        )
        VALUES (
            '${recycleId}'
            , '${weightPet}'
            , '${dateLast}'
            , NOW()
        )
        ON DUPLICATE KEY UPDATE
            
             date_last = '${dateLast}'
             , weight_pet = '${weightPet}'
        ;`;
};

getRecyclePetList = (bTotalCount,numOfRows,offset) => {
    let select = '';
    let limit = '';
    let whereStatus = '';




    if(bTotalCount === true) {
        select = `COUNT(tri.no) AS totalCount`;
    }else {
        select = `
           tri.no
           , tri.weight_pet as weightPet
           , tri.date_last as dateLast
           , tri.date_reg as dateReg
            
        `
        ;
        limit = `LIMIT ${offset}, ${numOfRows}`
    }
    return `
    SELECT
        ${select}
    FROM \`gpjw\`.tb_recycle_pet_info tri
    WHERE 1=1
    ${whereStatus}
    ORDER BY   tri.no desc
    ${limit}
    `;
};

module.exports = {
    addRecycle,
    deleteRecycle,

    getRecycleList,
    getRecycleTotal,

    addRecyclePet,
    getRecyclePetList,
};
