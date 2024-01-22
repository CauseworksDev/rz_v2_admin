let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const fileUpload = require('express-fileupload');

dotenv.config({ path: path.join(__dirname, '.env') });
console.log('NODE_ENV : ',process.env.NODE_ENV);
console.debug('log default test');
if(parseInt(process.env.logLevel) <= parseInt(process.env.logLevelSet)) {
    console.debug('log level test');
}



let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 파일 업로드 허용
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 30000000, // Around 30MB
    },
    abortOnLimit: true,
}));
app.use(
    session({
        secret: 'rzV2AdminContent',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 10 * 60 * 1000 },
        rolling : true
    }));



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended: false }));
/**
 * 각 서버별 셋팅*/
const setServer = require('./config/app.setting/setServer')
setServer.set()

const contentRouter = require('./src/router/api/content.router');
const bannerRouter = require('./src/router/api/banner.router');
const popupRouter = require('./src/router/api/popup.router');
const popupRecycle = require('./src/router/api/recycle.router');
const logs = require('./src/router/api/logs.router');

app.use('/api/content/v1.0', contentRouter);
app.use('/api/banner/v1.0', bannerRouter);
app.use('/api/popup/v1.0', popupRouter);
app.use('/api/recycle/v1.0', popupRecycle);
app.use('/api/logs/v1.0', logs);



//어드민 페이지 라우팅
const officeRouter = require('./config/app.setting/office.setting')
officeRouter.set(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
