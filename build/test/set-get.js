'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _getKey = require('../decorators/get-key');

var _getKey2 = _interopRequireDefault(_getKey);

var _removeKey = require('../decorators/remove-key');

var _removeKey2 = _interopRequireDefault(_removeKey);

var _writeKey = require('../decorators/write-key');

var _writeKey2 = _interopRequireDefault(_writeKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var micro = {
  logger: { error: function error(err) {
      return console.error(err);
    } }
};
var client = _redis2.default.createClient();

var delWrapper = (0, _removeKey2.default)(micro, client);
var getWrapper = (0, _getKey2.default)(micro, client);
var setWrapper = (0, _writeKey2.default)(micro, client);

getNullValue().then(getValueAsCallback).then(function () {
  return delWrapper('test-run-cb');
}).then(getValueAsAsyncCallback).then(getValue).then(setValue).then(function () {
  return Promise.all([delWrapper('test-get'), delWrapper('test-run-cb'), delWrapper('test-set-object')]);
}).then(function () {
  return client.quit();
});

describe('api', function () {
  it('должен вернуть null', function (done) {

    getWrapper('test-get').then(function (result) {
      should.equal(null, result);
      done();
    }, done);
  });
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

function getValueAsAsyncCallback() {
  return getWrapper('test-run-cb', function (key) {
    console.log('\u0414\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043A\u043B\u044E\u0447\u0430 ' + key + ' \u043D\u0435\u0442, \u0432\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u043D\u043E\u0432\u044B\u0435');
    return Promise.resolve({ id: 1 });
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