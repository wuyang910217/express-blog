module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      console.log('checkLogin 执行');
      return res.redirect('/signin');
    }
    next();
  },
  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      console.log('checkNotLogin 执行');
      return res.redirect('back'); // 返回之前的页面
    }
    next();
  }
};
