var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: '549300687@qq.com',
    pass: 'ztlzdrivyevxbecc'
  }
});

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/post', function (req, res) {
  var body = req.body;
  var html = `<p>${body.name}  ${body.stuNum}</p><p>email: ${body.email}</p><p>个人简介： ${body.introduction}</p><p>有趣的事： ${body.experience}</p>`; 
  var mailOptions = {
    from: '549300687@qq.com',
    to: 'zhoushidong@betahouse.us',
    subject: `${body.name}  ${body.stuNum}`,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
      res.render('success');
    }
  });
});

module.exports = router;