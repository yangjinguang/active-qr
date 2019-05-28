'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/settings', controller.settings.index);
  router.get('/settings/qr-add', controller.settings.qrAdd);
  router.post('/settings/qr-add-cb', controller.settings.qrAddCb);
};
