var express = require('express');
var router = express.Router();
const userdb = require('../data/userdb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/', async (req,res,next)=>{
  console.log('INSERT DATA INTO DB');
  const {rowCount} = await userdb.createUsers();
  res.send(`Inserted rows: ${rowCount}`);
})

module.exports = router;
