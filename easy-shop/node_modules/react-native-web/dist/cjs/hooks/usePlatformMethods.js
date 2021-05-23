"use strict";

exports.__esModule = true;
exports.default = usePlatformMethods;

var _UIManager = _interopRequireDefault(require("../exports/UIManager"));

var _createDOMProps = _interopRequireDefault(require("../modules/createDOMProps"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setNativeProps(node, nativeProps, classList, pointerEvents, style, previousStyleRef) {
  if (node != null && nativeProps) {
    var domProps = (0, _createDOMProps.default)(null, _objectSpread({
      pointerEvents: pointerEvents
    }, nativeProps, {
      classList: [classList, nativeProps.className],
      style: [style, nativeProps.style]
    }));
    var nextDomStyle = domProps.style;

    if (previousStyleRef.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }

      for (var styleName in previousStyleRef.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyleRef.current = nextDomStyle;

    _UIManager.default.updateView(node, domProps);
  }
}
/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */


function usePlatformMethods(props) {
  var previousStyleRef = (0, _react.useRef)(null);
  var classList = props.classList,
      style = props.style,
      pointerEvents = props.pointerEvents;
  return (0, _react.useMemo)(function () {
    return function (hostNode) {
      if (hostNode != null) {
        hostNode.measure = function (callback) {
          return _UIManager.default.measure(hostNode, callback);
        };

        hostNode.measureLayout = function (relativeToNode, success, failure) {
          return _UIManager.default.measureLayout(hostNode, relativeToNode, failure, success);
        };

        hostNode.measureInWindow = function (callback) {
          return _UIManager.default.measureInWindow(hostNode, callback);
        };

        hostNode.setNativeProps = function (nativeProps) {
          return setNativeProps(hostNode, nativeProps, classList, pointerEvents, style, previousStyleRef);
        };
      }

      return hostNode;
    };
  }, [classList, pointerEvents, style]);
}

module.exports = exports.default;