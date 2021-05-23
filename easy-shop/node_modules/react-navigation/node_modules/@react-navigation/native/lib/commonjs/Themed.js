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

class ThemedText extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(_reactNative.Text, _extends({}, this.props, {
      style: [{
        color: _core.ThemeColors[this.context].label
      }, this.props.style]
    }));
  }

}

_defineProperty(ThemedText, "contextType", _core.ThemeContext);

class ThemedTextInput extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(_reactNative.TextInput, _extends({}, this.props, {
      placeholderTextColor: this.context === 'dark' ? '#ebebf54c' : '#3c3c434c',
      style: [{
        color: _core.ThemeColors[this.context].label
      }, this.props.style]
    }));
  }

}

_defineProperty(ThemedTextInput, "contextType", _core.ThemeContext);

class ThemedStatusBar extends React.Component {
  render() {
    let {
      barStyle,
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement(_reactNative.StatusBar, _extends({
      barStyle: barStyle ? barStyle : this.context === 'dark' ? 'light-content' : 'default'
    }, props));
  }

}

_defineProperty(ThemedStatusBar, "contextType", _core.ThemeContext);

var _default = {
  Text: ThemedText,
  StatusBar: ThemedStatusBar,
  TextInput: ThemedTextInput
};
exports.default = _default;
//# sourceMappingURL=Themed.js.map