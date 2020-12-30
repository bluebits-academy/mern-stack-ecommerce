"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeTransition = exports.replace = exports.reset = exports.push = exports.popToTop = exports.pop = exports.COMPLETE_TRANSITION = exports.REPLACE = exports.RESET = exports.PUSH = exports.POP_TO_TOP = exports.POP = void 0;
const POP = 'Navigation/POP';
exports.POP = POP;
const POP_TO_TOP = 'Navigation/POP_TO_TOP';
exports.POP_TO_TOP = POP_TO_TOP;
const PUSH = 'Navigation/PUSH';
exports.PUSH = PUSH;
const RESET = 'Navigation/RESET';
exports.RESET = RESET;
const REPLACE = 'Navigation/REPLACE';
exports.REPLACE = REPLACE;
const COMPLETE_TRANSITION = 'Navigation/COMPLETE_TRANSITION';
exports.COMPLETE_TRANSITION = COMPLETE_TRANSITION;

const pop = payload => ({
  type: POP,
  ...payload
});

exports.pop = pop;

const popToTop = payload => ({
  type: POP_TO_TOP,
  ...payload
});

exports.popToTop = popToTop;

const push = payload => ({
  type: PUSH,
  ...payload
});

exports.push = push;

const reset = payload => ({
  type: RESET,
  key: null,
  ...payload
});

exports.reset = reset;

const replace = payload => ({
  type: REPLACE,
  ...payload
});

exports.replace = replace;

const completeTransition = payload => ({
  type: COMPLETE_TRANSITION,
  preserveFocus: true,
  ...payload
});

exports.completeTransition = completeTransition;
//# sourceMappingURL=StackActions.js.map