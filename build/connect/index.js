'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _errorHandler = require('./../utils/error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _retryStrategy = require('./retry-strategy');

var _retryStrategy2 = _interopRequireDefault(_retryStrategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (micro, plugin) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    var errorHandler = (0, _errorHandler2.default)(micro);
    var client = _redis2.default.createClient(_extends({
      retry_strategy: _retryStrategy2.default
    }, settings));

    client.on("error", errorHandler).on("ready", function (error) {
      if (error) {
        micro.logger.error('\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A Redis:', {
          id: plugin.id,
          error: error
        });

        return reject(error);
      }
      micro.logger.info('\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A Redis:', {
        id: plugin.id,
        payload: _extends({}, settings)
      });

      resolve(client);
    });
  });
};
//# sourceMappingURL=index.js.map