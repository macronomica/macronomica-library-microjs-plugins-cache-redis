'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MICRO = exports.MICRO = function MICRO() {
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

  return micro;
};
var DATA = exports.DATA = {
  null: null,
  undefined: undefined,
  number: 1,
  string: "string",
  boolean: true,
  date: new Date(),
  narray: [1, 2, 3],
  barray: [true, false],
  sarray: ["s1", "s2", "s3"]
};
//# sourceMappingURL=data.js.map