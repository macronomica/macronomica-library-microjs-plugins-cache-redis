'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _getKey = require('./../get-key');

var _getKey2 = _interopRequireDefault(_getKey);

var _delKey = require('./../del-key');

var _delKey2 = _interopRequireDefault(_delKey);

var _setKey = require('./../set-key');

var _setKey2 = _interopRequireDefault(_setKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var micro = {
  logger: { error: function error(err) {
      return console.error(err);
    } }
};
var client = _redis2.default.createClient();

var delWrapper = (0, _delKey2.default)(micro, client);
var getWrapper = (0, _getKey2.default)(micro, client);
var setWrapper = (0, _setKey2.default)(micro, client);

getNullValue().then(getValueAsCallback).then(getValue).then(setValue).then(function () {
  return Promise.all([delWrapper('test-get'), delWrapper('test-run-cb'), delWrapper('test-set-object')]);
}).then(function () {
  return client.quit();
});

function getNullValue() {
  return getWrapper('test-get').then(success, error);
}

function getValueAsCallback() {
  return getWrapper('test-run-cb', function (key) {
    console.log('\u0414\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043D\u0435\u0442, \u0432\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u043D\u043E\u0432\u044B\u0435');
    return { id: 1 };
  }).then(success, error);
}

function getValue() {
  return getWrapper('test-run-cb').then(success, error);
}

function setValue() {
  return setWrapper('test-set-object', { id: 2 }).then(success, error);
}

function success(result) {
  console.log(result);
}

function error(error) {
  console.error(error);
}
//# sourceMappingURL=set-get.js.map