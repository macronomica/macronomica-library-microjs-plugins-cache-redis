'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _readKey = require('./read-key');

var _readKey2 = _interopRequireDefault(_readKey);

var _writeKey = require('./write-key');

var _writeKey2 = _interopRequireDefault(_writeKey);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

var _save = require('./save');

var _save2 = _interopRequireDefault(_save);

var _tags = require('./tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({ load: _load2.default, save: _save2.default, read: _readKey2.default, write: _writeKey2.default }, _tags2.default);
//# sourceMappingURL=index.js.map