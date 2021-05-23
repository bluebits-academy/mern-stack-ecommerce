function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { TextInput } from 'react-native';
export default ((Navigator, navigatorConfig) => {
  var _class, _temp;

  return _temp = _class = class KeyboardAwareNavigator extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "_previouslyFocusedTextInput", null);

      _defineProperty(this, "_handleGestureBegin", () => {
        this._previouslyFocusedTextInput = TextInput.State.currentlyFocusedInput ? TextInput.State.currentlyFocusedInput() : TextInput.State.currentlyFocusedField();

        if (this._previouslyFocusedTextInput) {
          TextInput.State.blurTextInput(this._previouslyFocusedTextInput);
        }

        this.props.onGestureBegin && this.props.onGestureBegin();
      });

      _defineProperty(this, "_handleGestureCanceled", () => {
        if (this._previouslyFocusedTextInput) {
          TextInput.State.focusTextInput(this._previouslyFocusedTextInput);
        }

        this.props.onGestureCanceled && this.props.onGestureCanceled();
      });

      _defineProperty(this, "_handleGestureEnd", () => {
        this._previouslyFocusedTextInput = null;
        this.props.onGestureFinish && this.props.onGestureFinish();
      });

      _defineProperty(this, "_handleTransitionStart", (transitionProps, prevTransitionProps) => {
        // TODO: We should not even have received the transition start event
        // in the case where the index did not change, I believe. We
        // should revisit this after 2.0 release.
        if (transitionProps.index !== prevTransitionProps.index) {
          const currentField = TextInput.State.currentlyFocusedInput ? TextInput.State.currentlyFocusedInput() : TextInput.State.currentlyFocusedField();

          if (currentField) {
            TextInput.State.blurTextInput(currentField);
          }
        }

        const onTransitionStart = this.props.onTransitionStart || navigatorConfig.onTransitionStart;
        onTransitionStart && onTransitionStart(transitionProps, prevTransitionProps);
      });
    }

    render() {
      return /*#__PURE__*/React.createElement(Navigator, _extends({}, this.props, {
        onGestureBegin: this._handleGestureBegin,
        onGestureCanceled: this._handleGestureCanceled,
        onGestureEnd: this._handleGestureEnd,
        onTransitionStart: this._handleTransitionStart
      }));
    }

  }, _defineProperty(_class, "router", Navigator.router), _defineProperty(_class, "navigationOptions", Navigator.navigationOptions), _temp;
});
//# sourceMappingURL=createKeyboardAwareNavigator.js.map