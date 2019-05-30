/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'qr',
      // 密码
      password: 'rzuWXu5e00NYy',
      // 数据库名
      database: 'active_qr',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
};
