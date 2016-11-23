'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;
function errorHandler(micro) {
  return function (error) {
    if (!!error) {
      micro.logger.error('The server refused the connection', {
        code: 'error.plugin-cache-redis/' + error.code,
        message: error.message.toString()
      });
    }
  };
}
//# sourceMappingURL=error-handler.js.map