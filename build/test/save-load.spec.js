'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var should = _chai2.default.should();
var micro = (0, _data.MICRO)();
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

describe('save / load', function () {

  it('#plugin.load -> должен вернуть null', function () {
    return plugin.read(KEY).then(function (result) {
      return should.equal(null, result);
    });
  });

  it('#plugin.save + plugin.load -> должен вернуть объект', function () {
    return plugin.write(KEY, _data.DATA).then(function () {
      return plugin.read(KEY);
    }).then(function (result) {
      return result.should.be.a('object');
    }).then(function () {
      return plugin.del(KEY);
    });
  });

  it('#plugin.read + callback -> должен вернуть объект', function () {
    return plugin.read(KEY, function (key) {
      return _data.DATA;
    }).then(function (result) {
      return should.equal(_data.DATA, result);
    }).then(function () {
      return plugin.del(KEY);
    });
  });

  it('#plugin.read + callback():Promise -> должен вернуть объект', function () {
    return plugin.read(KEY, function (key) {
      return Promise.resolve(_data.DATA);
    }).then(function (result) {
      return should.equal(_data.DATA, result);
    }).then(function () {
      return plugin.del(KEY);
    });
  });
});
//# sourceMappingURL=save-load.spec.js.map