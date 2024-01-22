let express = require('express');
let router = express.Router();
let urlConfig = require('../../../config/config');
let session_user = null;

router.get('/',  function (req, res, next) {

    let no = req.query.cid
    session_user =  req.session
    // console.log(req.session.rule)
    let pageInfo = 1
    if(req.query.page){
        pageInfo=req.query.page
    }

    if(session_user.rule != null){
        if(req.session.rule ==4){
            res.render('admin/month/month', {result:{cid:no,pageInfo:pageInfo},session_user:req.session,server:urlConfig.SERVER});
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
    let contentId = req.query.contentId
    let email = req.query.email
    if(session_user.rule != null){
        if(req.session.rule ==4){
            if(contentId){
                res.render('admin/month/detail', {rows: contentId,session_user:req.session,server:urlConfig.SERVER});
            }else{
                res.render('admin/month/detail', {rows: 'new',session_user:req.session,server:urlConfig.SERVER});
            }
        }else{
            res.render('admin/login/loginn', { url: 'system' ,server:urlConfig.SERVER});
        }
    }else{
        res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
    }


});



module.exports = router;