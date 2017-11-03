var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var trainingadd = require('./routes/trainingadd');
var traininglist = require('./routes/traininglist');
var traininglistPage = require('./routes/traininglistPage');
var resourcesShare = require('./routes/resourcesShare');
var login = require('./routes/login');
var register = require('./routes/register');


global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb",{useMongoClient: true});
var app = express();

app.use(session({
    secret: 'secret',
    cookie:{
        //30分钟过期
        maxAge: 1000*60*60
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    var success=req.session.success;
    var user=req.session.user;
    delete req.session.error;
    res.locals.message = "";
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }else {
        // console.log(user);
        res.locals.message = '<div class="alert alert-success" style="margin-bottom:20px;color:#a72f2f;">'+success+'</div>';
    }
    next();
});

app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users);
app.use('/trainingadd', trainingadd);
app.use('/traininglist', traininglist);
app.use('/traininglistPage', traininglistPage);
app.use('/resourcesShare', resourcesShare);
app.use('/login', login);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});



module.exports = app;
