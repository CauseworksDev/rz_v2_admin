const officeContent = require("../../src/router/admin/content");
const officeBanner = require("../../src/router/admin/banner");
const officePopup = require("../../src/router/admin/popup");
const officeRecycle = require("../../src/router/admin/recycle");
const officeUser = require("../../src/router/admin/user");
const officeMonth = require("../../src/router/admin/month");
const officePet = require("../../src/router/admin/pet");
const officeSeaLink = require("../../src/router/admin/seaLink");


exports.set = app =>{
    /**
     * admin office url설정*/
    app.use('/admin/office/content', officeContent);
    app.use('/admin/office/banner', officeBanner);
    app.use('/admin/office/popup', officePopup);
    app.use('/admin/office/recycle', officeRecycle);
    app.use('/admin/office/pet', officePet);
    app.use('/admin/office/user', officeUser);
    app.use('/admin/office/month', officeMonth);
    app.use('/admin/office/sea', officeSeaLink);




}