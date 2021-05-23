"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MaterialTopTabView;

var React = _interopRequireWildcard(require("react"));

var _reactNativeTabView = require("react-native-tab-view");

var _native = require("@react-navigation/native");

var _MaterialTopTabBar = _interopRequireDefault(require("./MaterialTopTabBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function MaterialTopTabView({
  pager,
  lazyPlaceholder,
  tabBar = props => /*#__PURE__*/React.createElement(_MaterialTopTabBar.default, props),
  tabBarOptions,
  state,
  navigation,
  descriptors,
  sceneContainerStyle,
  ...rest
}) {
  const {
    colors
  } = (0, _native.useTheme)();

  const renderTabBar = props => {
    return tabBar({ ...tabBarOptions,
      ...props,
      state: state,
      navigation: navigation,
      descriptors: descriptors
    });
  };

  return /*#__PURE__*/React.createElement(_native.NavigationHelpersContext.Provider, {
    value: navigation
  }, /*#__PURE__*/React.createElement(_reactNativeTabView.TabView, _extends({}, rest, {
    onIndexChange: index => navigation.dispatch({ ..._native.TabActions.jumpTo(state.routes[index].name),
      target: state.key
    }),
    renderScene: ({
      route
    }) => descriptors[route.key].render(),
    navigationState: state,
    renderTabBar: renderTabBar,
    renderPager: pager,
    renderLazyPlaceholder: lazyPlaceholder,
    onSwipeStart: () => navigation.emit({
      type: 'swipeStart'
    }),
    onSwipeEnd: () => navigation.emit({
      type: 'swipeEnd'
    }),
    sceneContainerStyle: [{
      backgroundColor: colors.background
    }, sceneContainerStyle]
  })));
}
//# sourceMappingURL=MaterialTopTabView.js.map