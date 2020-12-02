var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressJWT = require('express-jwt')

const log = require('./db/log')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login/login')

const {PRIVATE_KEY} = require('./utils/constant')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 登录拦截jwt解密校验
 */
app.use(expressJWT({
  secret: PRIVATE_KEY,
  // algorithms:['HS256'],
  credentialsRequired:false
}).unless({
  path: ['/api/login/register']
}));



/**
 * 是一个日志中间件
 */
app.use((req, res, next) => log(req, res, next))

app.use('/', indexRouter);
app.use('/api/login', loginRouter)
app.use('/api/user', usersRouter);

/**
 * 是一个login的中间件
 */

app.use('/api/login', (req, res, next) => {
  console.log('是一个login的中间件')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * 异常情况进入这里
 */
app.use(function (err, req, res, next) {
  /**
   * UnauthorizedError token异常
   */
  if (err.name === 'UnauthorizedError') {   
    //  这个需要根据自己的业务逻辑来处理
    res.status(401).send({code:-1,msg:'token验证失败'});
  } else if (err.name === 'NotFoundError') { 
    /**
     * NotFoundError 找不到异常404
     */
    res.status(404).send({code:404,msg:'找不到接口'})

  }else{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
