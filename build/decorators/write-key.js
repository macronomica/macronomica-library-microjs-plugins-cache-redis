'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upcast = require('../utils/upcast');

var _upcast2 = _interopRequireDefault(_upcast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (micro, client) {
  return function (key, value) {
    return new Promise(function (resolve, reject) {
      var v = {
        type: _upcast2.default.type(value),
        value: value
      };

      client.set(key, JSON.stringify(v), function (err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.set/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        resolve(value);
      });
    });
  };
};
//# sourceMappingURL=write-key.js.map