"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNavigation;

var _getNavigationActionCreators = _interopRequireDefault(require("./routers/getNavigationActionCreators"));

var _getChildNavigation = _interopRequireDefault(require("./getChildNavigation"));

var _getChildrenNavigationCache = _interopRequireDefault(require("./getChildrenNavigationCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNavigation(router, state, dispatch, actionSubscribers, getScreenProps, getCurrentNavigation) {
  const actions = router.getActionCreators(state, null);
  const navigation = {
    actions,
    router,
    state,
    dispatch,
    getScreenProps,
    getChildNavigation: childKey => (0, _getChildNavigation.default)(navigation, childKey, getCurrentNavigation),
    isFocused: childKey => {
      const {
        routes,
        index
      } = getCurrentNavigation().state;

      if (childKey == null || routes[index].key === childKey) {
        return true;
      }

      return false;
    },
    addListener: (eventName, handler) => {
      if (eventName !== 'action') {
        return {
          remove: () => {}
        };
      }

      actionSubscribers.add(handler);
      return {
        remove: () => {
          actionSubscribers.delete(handler);
        }
      };
    },
    dangerouslyGetParent: () => null,
    isFirstRouteInParent: () => true,
    _childrenNavigation: (0, _getChildrenNavigationCache.default)(getCurrentNavigation())
  };
  const actionCreators = { ...(0, _getNavigationActionCreators.default)(navigation.state),
    ...actions
  };
  Object.keys(actionCreators).forEach(actionName => {
    navigation[actionName] = (...args) => navigation.dispatch(actionCreators[actionName](...args));
  });
  return navigation;
}
//# sourceMappingURL=getNavigation.js.map