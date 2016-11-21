'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _getKey = require('./../get-key');

var _getKey2 = _interopRequireDefault(_getKey);

var _delKey = require('./../del-key');

var _delKey2 = _interopRequireDefault(_delKey);

var _setKey = require('./../set-key');

var _setKey2 = _interopRequireDefault(_setKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var micro = {
  logger: { error: function error(err) {
      return console.error(err);
    } }
};
var client = _redis2.default.createClient();

var delWrapper = (0, _delKey2.default)(micro, client);
var getWrapper = (0, _getKey2.default)(micro, client);
var setWrapper = (0, _setKey2.default)(micro, client);

describe('api', function () {

  describe('#get', function () {
    it('должен вернуть null', function (done) {

      getWrapper('test-get').then(function (result) {
        should.equal(null, result);
        done();
      }, done);
    });

    it('должен вернуть объект переданный из callback', function (done) {
      var data = { id: 1 };

      getWrapper('test-run-cb', function (key) {
        return data;
      }).then(function (result) {
        should.equal(data, result);
        delWrapper('test-run-cb').then(function () {
          return done();
        }, done);
      }, done);
    });

    it('должен вернуть объект переданный из callback():Promise', function (done) {
      var data = { id: 1 };

      getWrapper('test-run-cb', function (key) {
        return Promise.resolve(data);
      }).then(function (result) {
        should.equal(data, result);
        delWrapper('test-run-cb').then(function () {
          return done();
        }, done);
      }, done);
    });
  });

  after(function () {
    return client.quit();
  });
});

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
//# sourceMappingURL=get.spec.js.map