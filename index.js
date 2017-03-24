var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var pkg = require('./package.json');
var winston = require('winston');
var expressWinston = require('express-winston');

app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

app.use(express.static(path.join(__dirname, 'public')));
/**
 * 正常请求的日志
 */
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

app.use('/', indexRouter);

app.use(function (err,req,res,next) {
  console.error(err.stack);
  res.status(500).send('Something wrong!');
});

app.listen(3000, function () {
  console.log(`${pkg.name} listening on port 3000`);
});