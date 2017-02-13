var express = require('express');
var sha1 = require('sha1');
var path = require('path');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//用户注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');
});

//用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  console.log('用户注册的req--------' );
  console.log(req.session);
  console.log(req.fields);
  console.log(req.files);
  var name = req.fields.name;
  var gender = req.fields.gender;
  var bio = req.fields.bio;
  var avatar = req.files.avatar.path.split(path.sep).pop();
  var password = req.fields.password;
  var repassword = req.fields.repassword;

  try {
    if (!(name.length >=1 && name.length <= 20)) {
      throw new Error('名字请限制在1-20个字符');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是男，女或者保密');
    }
    if (!(bio.length >=1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在1-30个字符');
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像');
    }
    if (password.length <= 5) {
      throw new Error('密码至少6个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一样');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/signup');
  }
  password = sha1(password);

  var user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };
//
//
  UserModel.create(user)
    .then(function(result) {
      user = result.ops[0];
      delete user.password;
      req.session.user = user;
      req.flash('success', '注册成功');
      res.redirect('/posts');
    })
    .catch(function(e) {
      var regex = new RegExp('E11000 duplicate key');
      if (e.message.match(regex)) {
        req.flash('error', '用户名已被占用');
        return res.redirect('/signup');
      }
      next(e);
    });
});

module.exports = router;
