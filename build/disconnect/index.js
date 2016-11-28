"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (micro, plugin, client) {
  return new Promise(function (resolve, reject) {
    if (!client || client.closing) {
      return resolve();
    }

    client.quit(function () {
      micro.logger.info("\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A Redis \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D\u043E", {
        id: plugin.id
      });

      resolve();
    });
  });
};
//# sourceMappingURL=index.js.map