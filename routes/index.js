var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Azure Node' });
  //res.send({request: 'success'});
});

module.exports = router;