'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var should = _chai2.default.should();
_chai2.default.config.showDiff = true;

var micro = (0, _data.MICRO)();
var plugin = (0, _index2.default)({})(micro, 'test', Date.now());

before(function () {
  var _micro$before;

  return (_micro$before = micro.before).done.apply(_micro$before, _toConsumableArray(micro.before.args)).then(function () {
    return plugin.del(plugin.TAGS_KEY);
  });
});

after(function () {
  return plugin.del(plugin.TAGS_KEY).then(function () {
    var _micro$after;

    return (_micro$after = micro.after).done.apply(_micro$after, _toConsumableArray(micro.after.args));
  });
});

describe('tags-get', function () {

  it('get all should null', function () {
    return plugin.tagget().then(function (tags) {
      return should.equal(tags, null);
    });
  });

  it('get one should null', function () {
    return plugin.tagget('user-1').then(function (tags) {
      return tags.should.to.contain.all.keys({ 'user-1': null });
    });
  });

  it('get many should null', function () {
    return plugin.tagget('user-1', 'user-2', 'user-3').then(function (tags) {
      return tags.should.to.contain.all.keys({ 'user-1': null, 'user-2': null, 'user-3': null });
    });
  });

  it('should have property', function () {
    return plugin.tagset('user-1', 'user-2').then(function (tags) {
      return plugin.tagget('user-1', 'user-2');
    }).then(function (tags) {
      return tags.should.to.contain.all.keys(['user-1', 'user-2']);
    });
  });
  it('should have property', function () {
    return plugin.tagset('user-1').then(function (tags) {
      return plugin.tagget('user-1');
    }).then(function (tags) {
      return tags.should.have.property('user-1');
    });
  });
});
//# sourceMappingURL=tags-get.spec.js.map