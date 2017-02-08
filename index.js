var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000, function() {
  console.log('app runs at localhost:3000');
});
