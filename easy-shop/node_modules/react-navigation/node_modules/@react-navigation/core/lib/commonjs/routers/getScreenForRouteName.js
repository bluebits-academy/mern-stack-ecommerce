"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScreenForRouteName;

var _reactIs = require("react-is");

var _invariant = _interopRequireDefault(require("../utils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
function getScreenForRouteName(routeConfigs, routeName) {
  const routeConfig = routeConfigs[routeName];

  if (!routeConfig) {
    throw new Error("There is no route defined for key ".concat(routeName, ".\n") + "Must be one of: ".concat(Object.keys(routeConfigs).map(a => "'".concat(a, "'")).join(',')));
  }

  if (routeConfig.screen) {
    return routeConfig.screen;
  }

  if (typeof routeConfig.getScreen === 'function') {
    const screen = routeConfig.getScreen();
    (0, _invariant.default)((0, _reactIs.isValidElementType)(screen), "The getScreen defined for route '".concat(routeName, " didn't return a valid ") + 'screen or navigator.\n\n' + 'Please pass it like this:\n' + "".concat(routeName, ": {\n  getScreen: () => require('./MyScreen').default\n}"));
    return screen;
  }

  return routeConfig;
}
//# sourceMappingURL=getScreenForRouteName.js.map