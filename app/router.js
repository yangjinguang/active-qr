'use strict';
const crypto = require('crypto');

/**
 * @param {Egg.Application} app - egg application
 */
const LocalStrategy = require('passport-local').Strategy;
module.exports = app => {
  const { router, controller } = app;
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    // log('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    const username = user.username;
    const password = user.password;
    const getUser = await ctx.app.mysql.get('users', { username });
    if (!getUser) {
      return false;
    }
    const saltPassword = password + ':' + getUser.slat;
    const md5 = crypto.createHash('md5');
    const result = md5.update(saltPassword)
      .digest('hex');
    if (getUser.password !== result) {
      return false;
    }
    return getUser;
  });
  app.passport.serializeUser(async (ctx, user) => {
    return user;
  });
  app.passport.deserializeUser(async (ctx, user) => {
    return user;
  });

  // 鉴权成功后的回调页面
  // router.get('/authCallback', controller.home.authCallback);

  // 渲染登录页面，用户输入账号密码
  router.get('/login', controller.home.login);
  // 登录校验
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/settings' }));
  // 退出
  router.get('/logout', controller.home.logout);

  router.get('/', controller.home.index);
  router.get('/settings', controller.settings.index);
  router.get('/settings/qr-add', controller.settings.qrAdd);
  router.post('/settings/qr-add-cb', controller.settings.qrAddCb);
  router.get('/settings/qr-delete', controller.settings.qrDelete);
};
