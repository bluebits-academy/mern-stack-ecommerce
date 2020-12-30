import { isValidElementType } from 'react-is';
import invariant from '../utils/invariant';
/**
 * Make sure the config passed e.g. to StackRouter, TabRouter has
 * the correct format, and throw a clear error if it doesn't.
 */

function validateRouteConfigMap(routeConfigs) {
  const routeNames = Object.keys(routeConfigs);
  invariant(routeNames.length > 0, 'Please specify at least one route when configuring a navigator.');
  routeNames.forEach(routeName => {
    const routeConfig = routeConfigs[routeName];
    const screenComponent = getScreenComponent(routeConfig);

    if (!screenComponent || !isValidElementType(screenComponent) && !routeConfig.getScreen) {
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

export default validateRouteConfigMap;
//# sourceMappingURL=validateRouteConfigMap.js.map