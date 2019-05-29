'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const app = this.ctx.app;
    const qrs = await app.mysql.select('qrs', { where: { disabled: 0 } });
    if (qrs.length > 0) {
      const currQr = qrs[0];
      await app.mysql.update('qrs', {
        times: currQr.times + 1,
        disabled: currQr.times >= currQr.times_limit ? 1 : 0,
      }, {
        where: {
          id: currQr.id,
        },
      });
      const data = {
        qrImage: `/public/qrs/${currQr.filename}`,
        qrs,
      };
      await this.ctx.render('/index.tpl', data);
    } else {
      this.ctx.body = 'Empty';
    }
  }

  async login() {
    await this.ctx.render('/login.tpl');
  }

  async logout() {
    await this.ctx.logout();
    await this.ctx.render('/login.tpl');
  }

  // async authCallback() {
  //   // await this.ctx.render('/login.tpl');
  // }
}

module.exports = HomeController;
