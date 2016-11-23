'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = void 0;

var proxy = new Proxy(Object.create(null), {
  get: function get(target, property) {
    if (property === 'client') {
      return client;
    }

    return client[property];
  }
});

client = _redis2.default.createClient().on('ready', function (error) {
  return proxy.get('key', _redis2.default.print);
});
//# sourceMappingURL=proxy-test.js.map