'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (micro, client) {
  return function () {
    for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
      tags[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      var hasManyTags = tags.length;

      hasManyTags ? client.hmget.apply(client, [_constants.TAGS_KEY].concat(tags, [callback])) : client.hgetall(_constants.TAGS_KEY, callback);

      function callback(err, result) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.tag/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0442\u0435\u0433\u043E\u0432 ' + tags.join(',') + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        if (result === null || !hasManyTags) {
          return resolve(result);
        }

        resolve(reduced(tags, result));
      }
    });
  };
};

function reduced(keys, values) {
  return keys.length > values.length ? reduceKeys(keys, values) : reduceValues(keys, values);
}

function reduceKeys(keys, values) {
  return keys.reduce(function (result, key, i) {
    return Object.assign(result, _defineProperty({}, key, values[i]));
  }, {});
}

function reduceValues(keys, values) {
  return values.reduce(function (result, value, i) {
    return Object.assign(result, _defineProperty({}, keys[i], value));
  }, {});
}
//# sourceMappingURL=get.js.map