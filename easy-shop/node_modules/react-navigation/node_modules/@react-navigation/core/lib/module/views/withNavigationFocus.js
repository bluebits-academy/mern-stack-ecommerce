function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import withNavigation from './withNavigation';
export default function withNavigationFocus(Component) {
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

  return hoistStatics(withNavigation(ComponentWithNavigationFocus, {
    forwardRef: false
  }), Component);
}
//# sourceMappingURL=withNavigationFocus.js.map