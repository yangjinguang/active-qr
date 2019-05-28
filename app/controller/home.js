'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const app = this.ctx.app;
    const qrs = await app.mysql.select('qr-imgs', { where: { disabled: 0 } });
    if (qrs.length > 0) {
      const currQr = qrs[0];
      console.log(currQr);
      await app.mysql.update('qr-imgs', {
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
}

module.exports = HomeController;
