'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _upcast = require('../utils/upcast');

var _upcast2 = _interopRequireDefault(_upcast);

var _writeKey = require('./write-key');

var _writeKey2 = _interopRequireDefault(_writeKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (micro, client) {
  return function (key, callback) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return new Promise(function (resolve, reject) {
      client.get(key, function (err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.get/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        if (result === null) {

          if ((0, _lodash2.default)(callback)) {
            var promise = callback(key);

            if (!promise || !('then' in promise && (0, _lodash2.default)(promise.then))) {
              promise = Promise.resolve(promise);
            }

            return promise.then(function (result) {
              return (0, _writeKey2.default)(micro, client)(key, result);
            }).then(resolve, reject);
          }

          return resolve(result);
        }

        var _JSON$parse = JSON.parse(result),
            type = _JSON$parse.type,
            value = _JSON$parse.value;

        resolve(_upcast2.default.to(value, type));
      });
    });
  };
};
//# sourceMappingURL=read-key.js.map