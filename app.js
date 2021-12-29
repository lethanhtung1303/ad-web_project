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

var notifyRouter = require('./routes/notify');

var apiRouter = require('./routes/api');

var deptRouter = require('./routes/dept');

var authRouter = require('./routes/auth');

var loginRouter = require('./routes/login');

var app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on("client_Send_Data", data => {
        io.sockets.emit("server_Return_Data", data)
    })
})

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

app.use('/notify', notifyRouter);

app.use('/api', apiRouter);

app.use('/dept', deptRouter);

app.use('/auth', authRouter);

app.use('/login', loginRouter);

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
