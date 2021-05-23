"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setParams = exports.navigate = exports.init = exports.back = exports.SET_PARAMS = exports.NAVIGATE = exports.INIT = exports.BACK = void 0;
// Action constants
const BACK = 'Navigation/BACK';
exports.BACK = BACK;
const INIT = 'Navigation/INIT';
exports.INIT = INIT;
const NAVIGATE = 'Navigation/NAVIGATE';
exports.NAVIGATE = NAVIGATE;
const SET_PARAMS = 'Navigation/SET_PARAMS'; // Action creators

exports.SET_PARAMS = SET_PARAMS;

const back = (payload = {}) => ({
  type: BACK,
  key: payload.key,
  immediate: payload.immediate
});

exports.back = back;

const init = (payload = {}) => {
  const action = {
    type: INIT
  };

  if (payload.params) {
    action.params = payload.params;
  }

  return action;
};

exports.init = init;

const navigate = payload => {
  const action = {
    type: NAVIGATE,
    routeName: payload.routeName
  };

  if (payload.params) {
    action.params = payload.params;
  }

  if (payload.action) {
    action.action = payload.action;
  }

  if (payload.key) {
    action.key = payload.key;
  }

  return action;
};

exports.navigate = navigate;

const setParams = payload => ({
  type: SET_PARAMS,
  key: payload.key,
  params: payload.params,
  preserveFocus: true
});

exports.setParams = setParams;
//# sourceMappingURL=NavigationActions.js.map