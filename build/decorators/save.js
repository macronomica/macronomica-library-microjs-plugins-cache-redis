'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upcast = require('../utils/upcast');

var _upcast2 = _interopRequireDefault(_upcast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (micro, client) {
  return function (key, value) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$tags = _ref.tags,
        tags = _ref$tags === undefined ? [] : _ref$tags;

    return new Promise(function (resolve, reject) {
      var hash = ['type', _upcast2.default.type(value), 'value', JSON.stringify(value)];

      client.hmset.apply(client, [key].concat(hash, [function (err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.set/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        resolve(value);
      }]));
    });
  };
};
//# sourceMappingURL=save.js.map