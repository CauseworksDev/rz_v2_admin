const officePage = require("../../src/router/admin/rz.page");



exports.set = app =>{
    /**
     * userPage url설정*/
    app.use('/', officePage);




}