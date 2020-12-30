"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const deprecatedKeys = ['tabBar'];
/**
 * Make sure screen options returned by the `getScreenOption`
 * are valid
 */

var _default = (screenOptions, route) => {
  const keys = Object.keys(screenOptions);
  const deprecatedKey = keys.find(key => deprecatedKeys.includes(key));

  if (typeof screenOptions.title === 'function') {
    throw new Error(["`title` cannot be defined as a function in navigation options for `".concat(route.routeName, "` screen. \n"), 'Try replacing the following:', '{', '    title: ({ state }) => state...', '}', '', 'with:', '({ navigation }) => ({', '    title: navigation.state...', '})'].join('\n'));
  }

  if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'function') {
    throw new Error(["`".concat(deprecatedKey, "` cannot be defined as a function in navigation options for `").concat(route.routeName, "` screen. \n"), 'Try replacing the following:', '{', "    ".concat(deprecatedKey, ": ({ state }) => ({"), '         key: state...', '    })', '}', '', 'with:', '({ navigation }) => ({', "    ".concat(deprecatedKey, "Key: navigation.state..."), '})'].join('\n'));
  }

  if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'object') {
    throw new Error(["Invalid key `".concat(deprecatedKey, "` defined in navigation options for `").concat(route.routeName, "` screen."), '\n', 'Try replacing the following navigation options:', '{', "    ".concat(deprecatedKey, ": {"), ...Object.keys(screenOptions[deprecatedKey]).map(key => "        ".concat(key, ": ...,")), '    },', '}', '\n', 'with:', '{', ...Object.keys(screenOptions[deprecatedKey]).map(key => "    ".concat(deprecatedKey + key[0].toUpperCase() + key.slice(1), ": ...,")), '}'].join('\n'));
  }
};

exports.default = _default;
//# sourceMappingURL=validateScreenOptions.js.map