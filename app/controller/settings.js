'use strict';

const Controller = require('egg').Controller;

class SettingsController extends Controller {
  async index() {
    const app = this.ctx.app;
    const qrs = await app.mysql.select('qr-imgs');
    const data = {
      qrs,
    };
    await this.ctx.render('/settings.tpl', data);
  }

  async qrAdd() {
    const data = {};
    await this.ctx.render('/settings-qr-add.tpl', data);
  }

  async qrAddCb() {
    // const parts = this.ctx.multipart({ autoFields: true });
    const stream = await this.ctx.getFileStream();
    console.log(stream.fields);
    await this.ctx.redirect('/settings');
  }
}

module.exports = SettingsController;
