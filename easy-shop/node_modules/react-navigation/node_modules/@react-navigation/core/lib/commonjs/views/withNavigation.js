"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withNavigation;

var React = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _invariant = _interopRequireDefault(require("../utils/invariant"));

var _NavigationContext = _interopRequireDefault(require("./NavigationContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withNavigation(Component, config = {
  forwardRef: true
}) {
  class ComponentWithNavigation extends React.Component {
    render() {
      const navigationProp = this.props.navigation;
      return /*#__PURE__*/React.createElement(_NavigationContext.default.Consumer, null, navigationContext => {
        const navigation = navigationProp || navigationContext;
        (0, _invariant.default)(!!navigation, 'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
        return /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
          navigation: navigation,
          ref: config.forwardRef ? this.props.onRef : undefined
        }));
      });
    }

  }

  _defineProperty(ComponentWithNavigation, "displayName", "withNavigation(".concat(Component.displayName || Component.name, ")"));

  return (0, _hoistNonReactStatics.default)(ComponentWithNavigation, Component);
}
//# sourceMappingURL=withNavigation.js.map