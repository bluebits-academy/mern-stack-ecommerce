"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jumpTo = exports.JUMP_TO = void 0;
const JUMP_TO = 'Navigation/JUMP_TO';
exports.JUMP_TO = JUMP_TO;

const jumpTo = payload => ({
  type: JUMP_TO,
  preserveFocus: true,
  ...payload
});

exports.jumpTo = jumpTo;
//# sourceMappingURL=SwitchActions.js.map