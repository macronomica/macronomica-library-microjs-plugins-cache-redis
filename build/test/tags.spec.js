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

var result = void 0;

before(function () {
  var _micro$before;

  return (_micro$before = micro.before).done.apply(_micro$before, _toConsumableArray(micro.before.args)).then(function () {
    return console.log(plugin.TAGS_KEY);
  }).then(function () {
    return plugin.del(plugin.TAGS_KEY);
  });
});

after(function () {
  return plugin.del(plugin.TAGS_KEY).then(function () {
    var _micro$after;

    return (_micro$after = micro.after).done.apply(_micro$after, _toConsumableArray(micro.after.args));
  });
});

describe('tags', function () {

  describe('#tag new', function () {
    it('should have property', function () {
      return plugin.tagset('user-1', 'user-2').then(function (tags) {});
    });
  });
});
//# sourceMappingURL=tags.spec.js.map