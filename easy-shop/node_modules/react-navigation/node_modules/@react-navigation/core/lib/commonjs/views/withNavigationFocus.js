"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withNavigationFocus;

var React = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _withNavigation = _interopRequireDefault(require("./withNavigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withNavigationFocus(Component) {
  class ComponentWithNavigationFocus extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        isFocused: this.props.navigation.isFocused()
      });
    }

    componentDidMount() {
      const {
        navigation
      } = this.props;
      this.subscriptions = [navigation.addListener('willFocus', () => this.setState({
        isFocused: true
      })), navigation.addListener('willBlur', () => this.setState({
        isFocused: false
      }))];
    }

    componentWillUnmount() {
      var _this$subscriptions;

      (_this$subscriptions = this.subscriptions) === null || _this$subscriptions === void 0 ? void 0 : _this$subscriptions.forEach(sub => sub.remove());
    }

    render() {
      return /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
        isFocused: this.state.isFocused,
        ref: this.props.onRef
      }));
    }

  }

  _defineProperty(ComponentWithNavigationFocus, "displayName", "withNavigationFocus(".concat(Component.displayName || Component.name, ")"));

  return (0, _hoistNonReactStatics.default)((0, _withNavigation.default)(ComponentWithNavigationFocus, {
    forwardRef: false
  }), Component);
}
//# sourceMappingURL=withNavigationFocus.js.map