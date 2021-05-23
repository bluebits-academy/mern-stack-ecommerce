"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionList = exports.FlatList = exports.ScrollView = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _createNavigationAwareScrollable = _interopRequireDefault(require("./createNavigationAwareScrollable"));

var _invariant = _interopRequireDefault(require("./utils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let WrappedScrollView;
exports.ScrollView = WrappedScrollView;

if (_reactNative.Platform.OS === 'android') {
  // @todo: use GHScrollView again when
  // https://github.com/kmagiera/react-native-gesture-handler/issues/560 has
  // been fixed.
  exports.ScrollView = WrappedScrollView = (0, _createNavigationAwareScrollable.default)(_reactNative.ScrollView);
} else {
  exports.ScrollView = WrappedScrollView = (0, _createNavigationAwareScrollable.default)(_reactNativeGestureHandler.ScrollView);
}

function propsMaybeWithRefreshControl(props) {
  const onRefresh = props.onRefresh;

  if (onRefresh) {
    (0, _invariant.default)(typeof props.refreshing === 'boolean', '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' + JSON.stringify(props.refreshing) + '`');
    return { ...props,
      refreshControl: props.refreshControl == null ? /*#__PURE__*/React.createElement(_reactNative.RefreshControl, {
        refreshing: props.refreshing,
        onRefresh: onRefresh,
        progressViewOffset: props.progressViewOffset
      }) : props.refreshControl
    };
  } else {
    return props;
  }
}

const WrappedFlatList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(_reactNative.FlatList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: props => /*#__PURE__*/React.createElement(WrappedScrollView, propsMaybeWithRefreshControl(props))
})));
exports.FlatList = WrappedFlatList;
const WrappedSectionList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(_reactNative.SectionList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: props => /*#__PURE__*/React.createElement(WrappedScrollView, propsMaybeWithRefreshControl(props))
})));
exports.SectionList = WrappedSectionList;
//# sourceMappingURL=Scrollables.js.map