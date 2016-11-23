"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (micro, client) {
  return function (key) {
    return new Promise(function (resolve, reject) {
      client.del(key, function (err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: "error.plugin-cache-redis.del/" + err.code,
            message: "\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u043A\u043B\u044E\u0447\u0430 " + key + " \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435"
          });
        }

        resolve(result);
      });
    });
  };
};
//# sourceMappingURL=remove-key.js.map