'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (micro, client, _ref) {
  var tagget = _ref.tagget,
      save = _ref.save;
  return function (key, callback) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        tags = _ref2.tags;

    return new Promise(function (resolve, reject) {
      client.hgetall(key, function (err, res) {
        if (err) {
          micro.logger.error(err);
          return reject({
            code: 'error.plugin-cache-redis.get/' + err.code,
            message: '\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043F\u0440\u0438\u0432\u0435\u043B\u0430 \u043A \u043E\u0448\u0438\u0431\u043A\u0435'
          });
        }

        if (res === null) {

          if ((0, _lodash2.default)(callback)) {
            var promise = callback(key);

            if (!promise || !('then' in promise && (0, _lodash2.default)(promise.then))) {
              promise = Promise.resolve(promise);
            }

            return promise.then(function (result) {
              return save(key, result, { tags: tags });
            }).then(resolve, reject);
          }

          return resolve(res);
        }

        if (!Array.isArray(tags)) {
          return resolve(JSON.parse(res.value, parseReviver));
        }

        tagget.apply(undefined, _toConsumableArray(tags)).then(function (originalTags) {
          if (hasTagUpdated(tags, originalTags)) {
            return resolve(null);
          }

          resolve(JSON.parse(res.value, parseReviver));
        });
      });
    });
  };
};

function hasTagUpdated(tags, originalTags) {
  return Object.keys(originalTags).some(function (key) {
    return originalTags[key] === tags[key];
  });
}

function parseReviver(key, value) {
  if (!!value && !!value.search && !!~value.search(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[A-Z]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[\.]{1}[0-9]{3}[A-Z]{1}$/)) {
    return new Date(value);
  }
  return value;
}
//# sourceMappingURL=load.js.map