var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello user list');
});

router.get('/:name', function(req, res) {
  res.send('hello' + req.params.name);
});

module.exports = router;
