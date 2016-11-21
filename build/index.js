'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _delKey = require('./del-key');

var _delKey2 = _interopRequireDefault(_delKey);

var _setKey = require('./set-key');

var _setKey2 = _interopRequireDefault(_setKey);

var _getKey = require('./get-key');

var _getKey2 = _interopRequireDefault(_getKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DRIVER = 'redis';

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      DRIVER = _ref.driver,
      connection = _objectWithoutProperties(_ref, ['driver']);

  return function (micro, name, pluginId) {
    var plugin = { name: name, id: pluginId };
    var _client = void 0;

    micro.queue({
      case: 'wait',
      args: [],
      done: function done() {
        return new Promise(function (resolve, reject) {
          _client = _redis2.default.createClient(_extends({}, connection, {
            retry_strategy: retryStrategy
          }));

          _client.on("error", errorCallback(micro)).on("ready", function (error) {
            if (error) {
              errorCallback(micro)(error);
              return reject(error);
            }

            resolve();
          });
        });
      }
    }).queue({
      case: 'close',
      args: [],
      done: function done() {
        return new Promise(function (resolve, reject) {
          if (!_client) {
            return resolve();
          }

          _client.quit();
          process.nextTick(function () {
            return resolve();
          });
        });
      }
    });

    return {
      middleware: _redis2.default,
      client: function client() {
        return _client;
      },

      get: function get() {
        return (0, _getKey2.default)(micro, _client).apply(undefined, arguments);
      },
      del: function del() {
        return (0, _delKey2.default)(micro, _client).apply(undefined, arguments);
      },
      set: function set() {
        return (0, _setKey2.default)(micro, _client).apply(undefined, arguments);
      }
    };
  };
};

function retryStrategy(options) {
  if (options.error.code === 'ECONNREFUSED') {
    // End reconnecting on a specific error and flush all commands with a individual error
    return new Error('The server refused the connection');
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands with a individual error
    return new Error('Retry time exhausted');
  }
  if (options.times_connected > 10) {
    // End reconnecting with built in error
    return undefined;
  }
  // reconnect after
  return Math.max(options.attempt * 100, 3000);
}

function errorCallback(micro) {
  return function (error) {
    if (!!error) {
      micro.logger.error('The server refused the connection', {
        code: 'error.plugin-cache-redis/' + error.code,
        message: error.message.toString()
      });
    }
  };
}
//# sourceMappingURL=index.js.map