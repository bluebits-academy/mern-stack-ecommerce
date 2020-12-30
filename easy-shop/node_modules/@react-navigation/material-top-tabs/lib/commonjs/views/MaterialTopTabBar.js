"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabBarTop;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeTabView = require("react-native-tab-view");

var _native = require("@react-navigation/native");

var _color = _interopRequireDefault(require("color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TabBarTop(props) {
  const {
    colors
  } = (0, _native.useTheme)();
  const {
    state,
    navigation,
    descriptors,
    activeTintColor = colors.text,
    inactiveTintColor = (0, _color.default)(activeTintColor).alpha(0.5).rgb().string(),
    allowFontScaling = true,
    showIcon = false,
    showLabel = true,
    pressColor = (0, _color.default)(activeTintColor).alpha(0.08).rgb().string(),
    iconStyle,
    labelStyle,
    indicatorStyle,
    style,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(_reactNativeTabView.TabBar, _extends({}, rest, {
    navigationState: state,
    activeColor: activeTintColor,
    inactiveColor: inactiveTintColor,
    indicatorStyle: [{
      backgroundColor: colors.primary
    }, indicatorStyle],
    style: [{
      backgroundColor: colors.card
    }, style],
    pressColor: pressColor,
    getAccessibilityLabel: ({
      route
    }) => descriptors[route.key].options.tabBarAccessibilityLabel,
    getTestID: ({
      route
    }) => descriptors[route.key].options.tabBarTestID,
    onTabPress: ({
      route,
      preventDefault
    }) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });

      if (event.defaultPrevented) {
        preventDefault();
      }
    },
    onTabLongPress: ({
      route
    }) => navigation.emit({
      type: 'tabLongPress',
      target: route.key
    }),
    renderIcon: ({
      route,
      focused,
      color
    }) => {
      if (showIcon === false) {
        return null;
      }

      const {
        options
      } = descriptors[route.key];

      if (options.tabBarIcon !== undefined) {
        const icon = options.tabBarIcon({
          focused,
          color
        });
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: [styles.icon, iconStyle]
        }, icon);
      }

      return null;
    },
    renderLabel: ({
      route,
      focused,
      color
    }) => {
      if (showLabel === false) {
        return null;
      }

      const {
        options
      } = descriptors[route.key];
      const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

      if (typeof label === 'string') {
        return /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.label, {
            color
          }, labelStyle],
          allowFontScaling: allowFontScaling
        }, label);
      }

      return label({
        focused,
        color
      });
    }
  }));
}

const styles = _reactNative.StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  },
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 13,
    margin: 4,
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=MaterialTopTabBar.js.map