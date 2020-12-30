"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.isOrientationLandscape = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isOrientationLandscape = ({
  width,
  height
}) => width > height;

exports.isOrientationLandscape = isOrientationLandscape;

function _default(WrappedComponent) {
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

      const _isLandscape = isOrientationLandscape(_reactNative.Dimensions.get('window'));

      this.state = {
        isLandscape: _isLandscape
      };
    }

    componentDidMount() {
      _reactNative.Dimensions.addEventListener('change', this.handleOrientationChange);
    }

    componentWillUnmount() {
      _reactNative.Dimensions.removeEventListener('change', this.handleOrientationChange);
    }

    render() {
      return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, this.props, this.state));
    }

  }

  return (0, _hoistNonReactStatics.default)(withOrientation, WrappedComponent);
}
//# sourceMappingURL=withOrientation.js.map