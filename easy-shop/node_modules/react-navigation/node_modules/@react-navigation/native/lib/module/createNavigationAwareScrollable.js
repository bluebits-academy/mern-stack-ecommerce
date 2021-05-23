function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { withNavigation } from '@react-navigation/core';
export default function createNavigationAwareScrollable(Component) {
  var _class, _temp;

  const ComponentWithNavigationScrolling = withNavigation((_temp = _class = class extends React.PureComponent {
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

  return hoistStatics(NavigationAwareScrollable, Component);
}
//# sourceMappingURL=createNavigationAwareScrollable.js.map