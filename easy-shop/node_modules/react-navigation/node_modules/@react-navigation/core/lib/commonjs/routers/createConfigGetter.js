"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("../utils/invariant"));

var _getScreenForRouteName = _interopRequireDefault(require("./getScreenForRouteName"));

var _validateScreenOptions = _interopRequireDefault(require("./validateScreenOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyConfig(configurer, navigationOptions, configProps) {
  if (typeof configurer === 'function') {
    return { ...navigationOptions,
      ...configurer({ ...configProps,
        navigationOptions
      })
    };
  }

  if (typeof configurer === 'object') {
    return { ...navigationOptions,
      ...configurer
    };
  }

  return navigationOptions;
}

var _default = (routeConfigs, navigatorScreenConfig) => (navigation, screenProps, theme) => {
  const {
    state
  } = navigation;
  const route = state;
  (0, _invariant.default)(route.routeName && typeof route.routeName === 'string', 'Cannot get config because the route does not have a routeName.');
  const Component = (0, _getScreenForRouteName.default)(routeConfigs, route.routeName);
  const routeConfig = routeConfigs[route.routeName];
  const routeScreenConfig = routeConfig === Component ? null : routeConfig.navigationOptions;
  const componentScreenConfig = Component.navigationOptions;
  const configOptions = {
    navigation,
    screenProps: screenProps || {},
    theme
  };
  let outputConfig = applyConfig(navigatorScreenConfig, {}, configOptions);
  outputConfig = applyConfig(componentScreenConfig, outputConfig, configOptions);
  outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions);
  (0, _validateScreenOptions.default)(outputConfig, route);
  return outputConfig;
};

exports.default = _default;
//# sourceMappingURL=createConfigGetter.js.map