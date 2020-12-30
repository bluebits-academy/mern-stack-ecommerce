"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _core = require("@react-navigation/core");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FAR_FAR_AWAY = 3000; // this should be big enough to move the whole view out of its container

class ResourceSavingSceneView extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isFocused && !prevState.awake) {
      return {
        awake: true
      };
    } else {
      return null;
    }
  }

  constructor(props) {
    super();

    _defineProperty(this, "_mustAlwaysBeVisible", () => {
      return this.props.animationEnabled || this.props.swipeEnabled;
    });

    this.state = {
      awake: props.lazy ? props.isFocused : true
    };
  }

  render() {
    const {
      awake
    } = this.state;
    const {
      isFocused,
      childNavigation,
      removeClippedSubviews,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: styles.container,
      collapsable: false,
      removeClippedSubviews: _reactNative.Platform.OS === 'android' ? removeClippedSubviews : !isFocused && removeClippedSubviews
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this._mustAlwaysBeVisible() || isFocused ? styles.innerAttached : styles.innerDetached
    }, awake ? /*#__PURE__*/React.createElement(_core.SceneView, _extends({}, rest, {
      navigation: childNavigation
    })) : null));
  }

}

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  innerAttached: {
    flex: 1
  },
  innerDetached: {
    flex: 1,
    top: FAR_FAR_AWAY
  }
});

var _default = ResourceSavingSceneView;
exports.default = _default;
//# sourceMappingURL=ResourceSavingSceneView.js.map