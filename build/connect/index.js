'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _errorHandler = require('./../utils/error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _retryStrategy = require('./retry-strategy');

var _retryStrategy2 = _interopRequireDefault(_retryStrategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (micro, redis, settings) {
  return new Promise(function (resolve, reject) {
    var errorHandler = (0, _errorHandler2.default)(micro);
    var client = redis.createClient(_extends({
      retry_strategy: _retryStrategy2.default
    }, settings));

    client.on("error", errorHandler).on("ready", function (error) {
      if (error) {
        errorHandler(error);
        return reject(error);
      }

      resolve(client);
    });
  });
};
//# sourceMappingURL=index.js.map