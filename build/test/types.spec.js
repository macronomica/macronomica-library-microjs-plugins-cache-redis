'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var should = _chai2.default.should();
_chai2.default.config.showDiff = true;

var micro = (0, _data.MICRO)();
var plugin = (0, _index2.default)({})(micro, 'test', Date.now());
var KEY = 'test-types-key';
var result = void 0;

before(function () {
  var _micro$before;

  return (_micro$before = micro.before).done.apply(_micro$before, _toConsumableArray(micro.before.args)).then(function () {
    return plugin.write(KEY, _data.DATA);
  }).then(function () {
    return plugin.read(KEY);
  }).then(function (raw) {
    return result = raw;
  });
});

after(function () {
  return plugin.del(KEY).then(function () {
    var _micro$after;

    return (_micro$after = micro.after).done.apply(_micro$after, _toConsumableArray(micro.after.args));
  });
});

describe('types', function () {

  describe('#null', function () {
    it('should have property', function () {
      return result.should.have.property('null');
    });
    it('should equal null', function () {
      return should.equal(result.null, _data.DATA.null);
    });
  });

  describe('#undefined', function () {
    it('should have not property', function () {
      return result.should.have.not.property('undefined');
    });
  });

  describe('#number', function () {
    it('should be a number', function () {
      return result.number.should.be.a('number');
    });
    it('should equal number', function () {
      return result.number.should.equal(_data.DATA.number);
    });
  });

  describe('#string', function () {
    it('should be a string', function () {
      return result.string.should.be.a('string');
    });
    it('should equal string', function () {
      return result.string.should.equal(_data.DATA.string);
    });
  });

  describe('#boolean', function () {
    it('should be a boolean', function () {
      return result.boolean.should.be.a('boolean');
    });
    it('should equal boolean', function () {
      return result.boolean.should.equal(_data.DATA.boolean);
    });
  });

  describe('#date', function () {
    it('should be a date', function () {
      return result.date.should.be.a('date');
    });
    it('should equal date', function () {
      return result.date.toString().should.equal(_data.DATA.date.toString());
    });
  });

  describe('#boolean[]', function () {
    it('should have property', function () {
      return result.should.have.property('barray');
    });
    it('should with length', function () {
      return result.barray.should.with.length(_data.DATA.barray.length);
    });

    it('items should be boolean', function () {
      return result.barray.forEach(function (row, i) {
        return row.should.be.a('boolean');
      });
    });
    it('items should equal', function () {
      return result.barray.forEach(function (row, i) {
        return row.should.equal(_data.DATA.barray[i]);
      });
    });
  });

  describe('#number[]', function () {
    it('should have property', function () {
      return result.should.have.property('narray');
    });
    it('should with length', function () {
      return result.narray.should.with.length(_data.DATA.narray.length);
    });

    it('items should be number', function () {
      return result.narray.forEach(function (row, i) {
        return row.should.be.a('number');
      });
    });
    it('items should equal', function () {
      return result.narray.forEach(function (row, i) {
        return row.should.equal(_data.DATA.narray[i]);
      });
    });
  });

  describe('#string[]', function () {
    it('should have property', function () {
      return result.should.have.property('sarray');
    });
    it('should with length', function () {
      return result.sarray.should.with.length(_data.DATA.sarray.length);
    });
    it('items should be string', function () {
      return result.sarray.forEach(function (row, i) {
        return row.should.be.a('string');
      });
    });
    it('items should equal', function () {
      return result.sarray.forEach(function (row, i) {
        return row.should.equal(_data.DATA.sarray[i]);
      });
    });
    it('items should with length', function () {
      return result.sarray.forEach(function (row, i) {
        return row.should.with.length(_data.DATA.sarray[i].length);
      });
    });
  });
});
//# sourceMappingURL=types.spec.js.map