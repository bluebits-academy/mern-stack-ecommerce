"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNavigationAwareScrollable;

var React = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _core = require("@react-navigation/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createNavigationAwareScrollable(Component) {
  var _class, _temp;

  const ComponentWithNavigationScrolling = (0, _core.withNavigation)((_temp = _class = class extends React.PureComponent {
    componentDidMount() {
      this._subscription = this.props.navigation.addListener('refocus', () => {
        const scrollableNode = this.getNode();

        if (this.props.navigation.isFocused() && scrollableNode !== null) {
          if (scrollableNode.scrollToTop != null) {
            scrollableNode.scrollToTop();
          } else if (scrollableNode.scrollTo != null) {
            scrollableNode.scrollTo({
              y: 0
            });
          } else if (scrollableNode.scrollResponderScrollTo != null) {
            scrollableNode.scrollResponderScrollTo({
              y: 0
            });
          }
        }
      });
    }

    componentWillUnmount() {
      if (this._subscription != null) {
        this._subscription.remove();
      }
    }

    getNode() {
      if (this._scrollRef === null) {
        return null;
      }

      if (this._scrollRef.getScrollResponder) {
        return this._scrollRef.getScrollResponder();
      } else if (this._scrollRef.getNode) {
        return this._scrollRef.getNode();
      } else {
        return this._scrollRef;
      }
    }

    render() {
      return /*#__PURE__*/React.createElement(Component, _extends({
        ref: view => {
          this._scrollRef = view;
        }
      }, this.props));
    }

  }, _defineProperty(_class, "displayName", "withNavigationScrolling(".concat(Component.displayName || Component.name, ")")), _temp));

  class NavigationAwareScrollable extends React.PureComponent {
    constructor(..._args) {
      super(..._args);

      _defineProperty(this, "_captureRef", view => {
        this._innerRef = view;
        this.props.onRef && this.props.onRef(view);
      });

      _defineProperty(this, "setNativeProps", (...args) => {
        return this._innerRef.getNode().setNativeProps(...args);
      });

      _defineProperty(this, "getScrollResponder", (...args) => {
        return this._innerRef.getNode().getScrollResponder(...args);
      });

      _defineProperty(this, "getScrollableNode", (...args) => {
        return this._innerRef.getNode().getScrollableNode(...args);
      });

      _defineProperty(this, "getInnerViewNode", (...args) => {
        return this._innerRef.getNode().getInnerViewNode(...args);
      });

      _defineProperty(this, "scrollTo", (...args) => {
        return this._innerRef.getNode().scrollTo(...args);
      });

      _defineProperty(this, "scrollToEnd", (...args) => {
        return this._innerRef.getNode().scrollToEnd(...args);
      });

      _defineProperty(this, "scrollWithoutAnimationTo", (...args) => {
        return this._innerRef.getNode().scrollWithoutAnimationTo(...args);
      });

      _defineProperty(this, "flashScrollIndicators", (...args) => {
        return this._innerRef.getNode().flashScrollIndicators(...args);
      });
    }

    render() {
      return /*#__PURE__*/React.createElement(ComponentWithNavigationScrolling, _extends({}, this.props, {
        onRef: this._captureRef
      }));
    }

  }

  _defineProperty(NavigationAwareScrollable, "displayName", "NavigationAwareScrollable(".concat(Component.displayName || Component.name, ")"));

  return (0, _hoistNonReactStatics.default)(NavigationAwareScrollable, Component);
}
//# sourceMappingURL=createNavigationAwareScrollable.js.map