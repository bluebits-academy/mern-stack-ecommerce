"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactIs = require("react-is");

var _invariant = _interopRequireDefault(require("../utils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make sure the config passed e.g. to StackRouter, TabRouter has
 * the correct format, and throw a clear error if it doesn't.
 */
function validateRouteConfigMap(routeConfigs) {
  const routeNames = Object.keys(routeConfigs);
  (0, _invariant.default)(routeNames.length > 0, 'Please specify at least one route when configuring a navigator.');
  routeNames.forEach(routeName => {
    const routeConfig = routeConfigs[routeName];
    const screenComponent = getScreenComponent(routeConfig);

    if (!screenComponent || !(0, _reactIs.isValidElementType)(screenComponent) && !routeConfig.getScreen) {
      throw new Error("The component for route '".concat(routeName, "' must be a React component. For example:\n\nimport MyScreen from './MyScreen';\n...\n").concat(routeName, ": MyScreen,\n}\n\nYou can also use a navigator:\n\nimport MyNavigator from './MyNavigator';\n...\n").concat(routeName, ": MyNavigator,\n}"));
    }

    if (routeConfig.screen && routeConfig.getScreen) {
      throw new Error("Route '".concat(routeName, "' should declare a screen or a getScreen, not both."));
    }
  });
}

function getScreenComponent(routeConfig) {
  if (!routeConfig) {
    return null;
  }

  return routeConfig.screen ? routeConfig.screen : routeConfig;
}

var _default = validateRouteConfigMap;
exports.default = _default;
//# sourceMappingURL=validateRouteConfigMap.js.map