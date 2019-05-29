'use strict';
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

const Controller = require('egg').Controller;

class SettingsController extends Controller {
  async index() {
    const authenticated = this.ctx.isAuthenticated();
    if (!authenticated) {
      this.ctx.redirect('/login');
    }
    const app = this.ctx.app;
    const qrs = await app.mysql.select('qrs');
    const data = {
      qrs,
      user: this.ctx.user,
    };
    await this.ctx.render('/settings.tpl', data);
  }

  async qrAdd() {
    const authenticated = this.ctx.isAuthenticated();
    if (!authenticated) {
      this.ctx.redirect('/login');
    }
    let getQr = null;
    const id = this.ctx.query.id;
    if (id) {
      getQr = await this.ctx.app.mysql.get('qrs', { id });
      if (!getQr) {
        this.throw(404, 'Can\'t found this qr');
      }
    }
    const data = {
      user: this.ctx.user,
      qr: getQr,
    };
    await this.ctx.render('/settings-qr-add.tpl', data);
  }

  async qrAddCb() {
    const authenticated = this.ctx.isAuthenticated();
    if (!authenticated) {
      this.ctx.redirect('/login');
    }
    const app = this.ctx.app;
    const stream = await this.ctx.getFileStream({ requireFile: false });
    let filename = '';
    if (stream.filename) {
      const filenameArr = stream.filename.split('.');
      filename = `qr-${new Date().getTime()}.${filenameArr[filenameArr.length - 1]}`;
      const targetDir = path.join(this.config.baseDir, 'app/public/qrs');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
      }
      const target = path.join(targetDir, filename);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    if (stream.fields.id) {
      const getQr = await app.mysql.get('qrs', { id: stream.fields.id });
      if (!getQr) {
        this.throw(404, 'Can\'t found this qr');
      }
      const updateData = {
        name: stream.fields.name,
        times_limit: stream.fields.timesLimit,
        disabled: stream.fields.timesLimit <= getQr.times,
      };
      if (filename) {
        updateData.filename = filename;
      }
      await app.mysql.update('qrs', updateData, {
        where: {
          id: stream.fields.id,
        },
      });
    } else {
      await app.mysql.insert('qrs', {
        name: stream.fields.name,
        filename,
        times_limit: stream.fields.timesLimit,
        disabled: 0,
      });
    }
    await this.ctx.redirect('/settings');
  }

  async qrDelete() {
    const authenticated = this.ctx.isAuthenticated();
    if (!authenticated) {
      this.ctx.redirect('/login');
    }
    const app = this.ctx.app;
    const id = this.ctx.query.id;
    if (!id) {
      this.throw(404, 'Can\'t found this qr');
    }
    await app.mysql.delete('qrs', { id });
    await this.ctx.redirect('/settings');
  }
}

module.exports = SettingsController;
