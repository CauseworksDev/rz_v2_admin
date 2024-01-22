let express = require('express');
let router = express.Router();
let urlConfig = require('../../../config/config');
let session_user = null;

router.get('/',  function (req, res, next) {

    let no = req.query.cid
    session_user =  req.session
    let pageInfo = 1
    if(req.query.page){
        pageInfo=req.query.page
    }

    if(session_user.rule != null){
        if(req.session.rule ==4){
            res.render('admin/popup/popup', {result:{cid:no,pageInfo:pageInfo},session_user:req.session,server:urlConfig.SERVER});
        }else{
            res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
        }
    }else{
        res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
    }

});


router.get('/detail',  function(req, res, next) {
    let no = req.query.cid
    session_user =  req.session
    let popupId = req.query.popupId
    let email = req.query.email

    if(session_user.rule != null){
        if(req.session.rule ==4){
            if(popupId){
                res.render('admin/popup/detail', {rows: popupId,session_user:req.session,server:urlConfig.SERVER});
            }else{
                res.render('admin/popup/detail', {rows: 'new',session_user:req.session,server:urlConfig.SERVER});
            }
        }else{
            res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
        }
    }else{
        res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
    }

});



module.exports = router;