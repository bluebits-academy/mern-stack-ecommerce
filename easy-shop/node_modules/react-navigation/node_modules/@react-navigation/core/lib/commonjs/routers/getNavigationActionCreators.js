"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var NavigationActions = _interopRequireWildcard(require("../NavigationActions"));

var _invariant = _interopRequireDefault(require("../utils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: Type `route`
const getNavigationActionCreators = route => {
  return {
    goBack: key => {
      let actualizedKey = key;

      if (key === undefined && route.key) {
        (0, _invariant.default)(typeof route.key === 'string', 'key should be a string');
        actualizedKey = route.key;
      }

      return NavigationActions.back({
        key: actualizedKey
      });
    },
    navigate: (navigateTo, params, action) => {
      if (typeof navigateTo === 'string') {
        return NavigationActions.navigate({
          routeName: navigateTo,
          params,
          action
        });
      }

      (0, _invariant.default)(typeof navigateTo === 'object', 'Must navigateTo an object or a string');
      (0, _invariant.default)(params == null, 'Params must not be provided to .navigate() when specifying an object');
      (0, _invariant.default)(action == null, 'Child action must not be provided to .navigate() when specifying an object');
      return NavigationActions.navigate(navigateTo);
    },
    setParams: params => {
      (0, _invariant.default)(route.key && typeof route.key === 'string', 'setParams cannot be called by root navigator');
      return NavigationActions.setParams({
        params,
        key: route.key
      });
    }
  };
};

var _default = getNavigationActionCreators;
exports.default = _default;
//# sourceMappingURL=getNavigationActionCreators.js.map