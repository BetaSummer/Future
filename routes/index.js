var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/post', function (req, res) {
  console.log(req.body);
});

module.exports = router;