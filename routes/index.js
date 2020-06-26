var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'Azure Node Service',
    message: process.env.MESSAGE || 'This Is Development environment'
  }
  res.render('index', data);
  //res.send({request: 'success'});
});

module.exports = router;
