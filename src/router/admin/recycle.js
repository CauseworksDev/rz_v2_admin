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
            res.render('admin/recycle/recycle', {result:{cid:no,pageInfo:pageInfo},session_user:req.session,server:urlConfig.SERVER});
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
    let year = req.query.year
    let location = req.query.location

    if(session_user.rule != null){
        if(req.session.rule ==4){
            if(year){
                res.render('admin/recycle/detail', {year: year,location:location,session_user:req.session,server:urlConfig.SERVER});
            }else{
                res.render('admin/recycle/detail', {year: 'new',location:location,session_user:req.session,server:urlConfig.SERVER});
            }
        }else{
            res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
        }
    }else{
        res.render('admin/login/login', { url: 'system' ,server:urlConfig.SERVER});
    }

});


module.exports = router;