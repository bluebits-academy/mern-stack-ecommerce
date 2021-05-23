function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import invariant from '../utils/invariant';
import NavigationContext from './NavigationContext';
export default function withNavigation(Component, config = {
  forwardRef: true
}) {
  class ComponentWithNavigation extends React.Component {
    render() {
      const navigationProp = this.props.navigation;
      return /*#__PURE__*/React.createElement(NavigationContext.Consumer, null, navigationContext => {
        const navigation = navigationProp || navigationContext;
        invariant(!!navigation, 'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
        return /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
          navigation: navigation,
          ref: config.forwardRef ? this.props.onRef : undefined
        }));
      });
    }

  }

  _defineProperty(ComponentWithNavigation, "displayName", "withNavigation(".concat(Component.displayName || Component.name, ")"));

  return hoistStatics(ComponentWithNavigation, Component);
}
//# sourceMappingURL=withNavigation.js.map