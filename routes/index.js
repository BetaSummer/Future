var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
    var nameArr = file.originalname.split('.');
    cb(null, `${nameArr[0]}${Date.now()}.${nameArr[1]}`);
  }
});
var upload = multer({
  storage: storage
});

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
  var dateObj = new Date();
  if(dateObj.getDate() >= 29 && dateObj.getMonth() >= 2 && dateObj.getHours() >= 18) {
    res.render('index');
  } else {
    res.render('deadline');
  }
});

router.post('/post', upload.fields([{ name: 'file', maxCount: 1 }]) ,function (req, res) {
  var body = req.body;
  var html = `<p>${body.name}  ${body.stuNum}</p><p>手机: ${body.phone}</p><p>email: ${body.email}</p><p>个人简介： ${body.introduction}</p><p>有趣的事： ${body.experience}</p>`; 
  var mailOptions = {
    from: '549300687@qq.com',
    to: 'zhoushidong@betahouse.us',
    subject: `${body.name}  ${body.stuNum}`,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({message:"提交失败，请重试😔"});
    } else {
      console.log('Message sent: ' + info.response);
      res.status(200).send({message:"提交成功，我们会尽快回复，届时请留意短信和邮件😜"});
    }
  });
});

module.exports = router;