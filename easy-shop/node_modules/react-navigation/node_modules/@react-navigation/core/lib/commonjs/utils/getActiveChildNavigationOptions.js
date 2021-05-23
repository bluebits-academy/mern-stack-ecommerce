"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getActiveChildNavigationOptions = (navigation, screenProps, theme = 'light') => {
  const {
    state,
    router,
    getChildNavigation
  } = navigation;
  const activeRoute = state.routes[state.index];
  const activeNavigation = getChildNavigation(activeRoute.key);
  const options = router.getScreenOptions(activeNavigation, screenProps, theme);
  return options;
};

var _default = getActiveChildNavigationOptions;
exports.default = _default;
//# sourceMappingURL=getActiveChildNavigationOptions.js.map