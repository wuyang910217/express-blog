var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views', path.join(__dirname,  'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.use(function(req, res, next) {
  res.status(404).render('404');
});

app.listen(3000, function() {
  console.log('app runs at localhost:3000');
});
