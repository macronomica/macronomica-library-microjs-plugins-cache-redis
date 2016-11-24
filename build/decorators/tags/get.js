'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (micro, client) {
  return function () {
    for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
      tags[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      client.hmset.apply(client, [_constants.TAGS_KEY].concat(_toConsumableArray(result.keys), [function (err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.tag/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0442\u0435\u0433\u043E\u0432 ' + tags.join(',') + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        resolve(result.tags);
      }]));
    });
  };
};
//# sourceMappingURL=get.js.map