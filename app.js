require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');

const db = require('./config/db');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var postRouter = require('./routes/post');
var myPostRouter = require('./routes/myPost');
var getAnnounce = require('./routes/getAnnounce');
var addNotifyRouter = require('./routes/addNotify');
var editNotifyRouter = require('./routes/editNotify');
var deleteNotifyRouter = require('./routes/deleteNotify');
var myNotifyRouter = require('./routes/myNotify');
var notifyListRouter = require('./routes/notifyList');
var notifyListTopicRouter = require('./routes/notifyListTopic');
var notifyTopicRouter = require('./routes/notifyTopic');
var deptListRouter = require('./routes/deptList');
var addDeptRouter = require('./routes/addDept');
var profileRouter = require('./routes/profile');
var changeAvtRouter = require('./routes/changeAvt');
var changePassRouter = require('./routes/changePass');
var notifyDetailRouter = require('./routes/notifyDetail');
var logoutRouter = require('./routes/logout');
var loginRouter = require('./routes/login');
var loginGGRouter = require('./routes/loginGG');
var getAnnounceByAuths = require('./routes/getAnnounceByAuths')
var getListMyAnnounce = require('./routes/getListMyAnnounce')

var app = express();
//socket
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', socket => {
//     socket.on("client_Send_Data", data => {
//         io.sockets.emit("server_Return_Data", data)
//     })
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
    }),
);

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/post', postRouter);
app.use('/myPost', myPostRouter);
app.use('/addNotify', addNotifyRouter);
app.use('/editNotify', editNotifyRouter);
app.use('/deleteNotify', deleteNotifyRouter);
app.use('/getAnnounce', getAnnounce);
app.use('/myNotify', myNotifyRouter);
app.use('/notifyList', notifyListRouter);
app.use('/notifyListTopic', notifyListTopicRouter);
app.use('/notifyTopic', notifyTopicRouter);
app.use('/deptList', deptListRouter);
app.use('/addDept', addDeptRouter);
app.use('/profile', profileRouter);
app.use('/changeAvt', changeAvtRouter);
app.use('/changePass', changePassRouter);
app.use('/notifyDetail', notifyDetailRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/loginGG', loginGGRouter);
app.use('/getAnnounceByAuths', getAnnounceByAuths)
app.use('/getListMyAnnounce', getListMyAnnounce)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
