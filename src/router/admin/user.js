let express = require('express');
let router = express.Router();
let urlConfig = require('../../../config/config');
const responseCommon = require("../../common/response");
let session_user = null;

router.get('/',  function (req, res, next) {

    let no = req.query.cid
    session_user =  req.session
    let pageInfo = 1
    if(req.query.page){
        pageInfo=req.query.page
    }
    res.render('admin/login/login', {result:{},session_user:req.session,server:urlConfig.SERVER});
});

router.post('/login',  function (req, res, next) {


    session_user =  req.session
    let id = req.body.id
    let pwd = req.body.pwd
    let result = {
        resultCode : 200,
        resultMsg : "success"
    };
    let pass = false
    if(id == "admin@causeworks.co.kr"&&pwd=="happy0415!!"){
        pass = true
        req.session.rule = 4
        req.session.usr_id = "admin@causeworks.co.kr"
    }

    let resData = {
        result : result
    }
    if (pass == false){
        result.resultCode = 402
        result.resultMsg = "failed"
    }
    res.send(resData)


});

router.get('/signout',  function (req, res, next) {


    session_user =  req.session
    req.session.rule = null
    req.session.usr_id = ""

    res.render('admin/login/login', {result:{},session_user:req.session,server:urlConfig.SERVER});


});
module.exports = router;