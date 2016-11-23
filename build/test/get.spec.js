'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var should = _chai2.default.should();
var micro = {
  before: { done: function done() {}, args: [] },
  after: { done: function done() {}, args: [] },
  queue: function queue(raw) {

    switch (raw.case) {
      case 'wait':
        micro.before = raw;break;
      case 'close':
        micro.after = raw;break;
    }

    return micro;
  },
  logger: {
    error: function error(err) {
      return console.error(err);
    }
  }
};

var plugin = (0, _index2.default)({})(micro, 'test', Date.now());
var KEY = 'test-key';

before(function () {
  var _micro$before;

  return (_micro$before = micro.before).done.apply(_micro$before, _toConsumableArray(micro.before.args));
});

after(function () {
  var _micro$after;

  return (_micro$after = micro.after).done.apply(_micro$after, _toConsumableArray(micro.after.args));
});

describe('read / write', function () {

  it('#plugin.read -> должен вернуть null', function () {
    return plugin.read(KEY).then(function (result) {
      return should.equal(null, result);
    });
  });

  it('#plugin.write + plugin.read -> должен вернуть объект', function () {
    return plugin.write(KEY, { id: 1 }).then(function () {
      return plugin.read(KEY);
    }).then(function (result) {
      result.should.be.a('object');
      should.equal(1, result.id);
    }).then(function () {
      return plugin.del(KEY);
    });
  });

  it('#plugin.read + callback -> должен вернуть объект', function () {
    var data = { id: 1 };

    return plugin.read(KEY, function (key) {
      return data;
    }).then(function (result) {
      return should.equal(data, result);
    }).then(function () {
      return plugin.del(KEY);
    });
  });

  it('#plugin.read + callback():Promise -> должен вернуть объект', function () {
    var data = { id: 1 };

    return plugin.read(KEY, function (key) {
      return Promise.resolve(data);
    }).then(function (result) {
      return should.equal(data, result);
    }).then(function () {
      return plugin.del(KEY);
    });
  });
});
//# sourceMappingURL=get.spec.js.map