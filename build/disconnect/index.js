"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client) {
  return new Promise(function (resolve, reject) {
    if (!client || client.closing) {
      return resolve();
    }

    client.quit(function () {
      return resolve();
    });
  });
};
//# sourceMappingURL=index.js.map