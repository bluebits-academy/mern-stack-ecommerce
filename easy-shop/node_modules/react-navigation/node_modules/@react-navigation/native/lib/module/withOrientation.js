function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Dimensions } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
export const isOrientationLandscape = ({
  width,
  height
}) => width > height;
export default function (WrappedComponent) {
  class withOrientation extends React.Component {
    constructor() {
      super();

      _defineProperty(this, "handleOrientationChange", ({
        window
      }) => {
        const isLandscape = isOrientationLandscape(window);
        this.setState({
          isLandscape
        });
      });

      const _isLandscape = isOrientationLandscape(Dimensions.get('window'));

      this.state = {
        isLandscape: _isLandscape
      };
    }

    componentDidMount() {
      Dimensions.addEventListener('change', this.handleOrientationChange);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.handleOrientationChange);
    }

    render() {
      return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, this.props, this.state));
    }

  }

  return hoistNonReactStatic(withOrientation, WrappedComponent);
}
//# sourceMappingURL=withOrientation.js.map