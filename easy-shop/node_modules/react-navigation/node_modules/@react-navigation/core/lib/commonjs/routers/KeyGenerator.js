"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._TESTING_ONLY_normalize_keys = _TESTING_ONLY_normalize_keys;
exports.generateKey = generateKey;
let uniqueBaseId = "id-".concat(Date.now());
let uuidCount = 0;

function _TESTING_ONLY_normalize_keys() {
  uniqueBaseId = "id";
  uuidCount = 0;
}

function generateKey() {
  return "".concat(uniqueBaseId, "-").concat(uuidCount++);
}
//# sourceMappingURL=KeyGenerator.js.map