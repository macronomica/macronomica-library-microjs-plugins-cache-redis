'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isplainobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _setKey = require('./set-key');

var _setKey2 = _interopRequireDefault(_setKey);

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
            return (0, _setKey2.default)(micro, client)(key, callback(key)).then(resolve).catch(reject);
          }
        }

        resolve(result);
      });
    });
  };
};
//# sourceMappingURL=get-key.js.map