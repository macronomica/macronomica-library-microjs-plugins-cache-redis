'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _disconnect = require('./disconnect');

var _disconnect2 = _interopRequireDefault(_disconnect);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DRIVER = 'redis';

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$driver = _ref.driver,
      driver = _ref$driver === undefined ? DRIVER : _ref$driver,
      settings = _objectWithoutProperties(_ref, ['driver']);

  return function (micro, name, pluginId) {
    var plugin = { id: pluginId, name: name, middleware: _redis2.default, client: null };
    var __decorators = {};

    micro.queue({
      case: 'wait',
      args: [],
      done: function done() {
        return (0, _connect2.default)(micro, _redis2.default, settings).then(function (client) {
          return plugin.client = client;
        }).then(applyDecorators(micro, __decorators));
      }
    }).queue({
      case: 'close',
      args: [],
      done: function done() {
        return (0, _disconnect2.default)(plugin.client);
      }
    });

    return new Proxy(plugin, {
      get: function get(target, property) {
        if (property in target) {
          return target[property];
        }

        if (property in __decorators) {
          return __decorators[property];
        }

        if ((0, _lodash2.default)(plugin.client[property])) {
          return function () {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
              rest[_key] = arguments[_key];
            }

            return new Promise(function (resolve, reject) {
              var _plugin$client;

              return (_plugin$client = plugin.client)[property].apply(_plugin$client, rest.concat([function (err, result) {
                return err ? reject(err) : resolve(result);
              }]));
            });
          };
        }

        return plugin.client[property];
      }
    });
  };
};

function applyDecorators(micro, __decorators) {
  return function (client) {
    return Object.keys(_decorators2.default).forEach(function (key) {
      if ((0, _lodash2.default)(_decorators2.default[key])) {
        __decorators[key] = _decorators2.default[key](micro, client);
      } else {
        __decorators[key] = _decorators2.default[key];
      }
    });
  };
}
//# sourceMappingURL=index.js.map