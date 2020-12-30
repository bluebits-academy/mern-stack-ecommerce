function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-check
import * as React from 'react';
/**
 * @typedef {object} State
 * @prop {number} index
 * @prop {({ key: string } & (State | {}))[]} routes
 * @prop {boolean} [isTransitioning]
 *
 * @typedef {object} ParentPayload
 * @prop {string} type
 * @prop {object} action
 * @prop {State} state
 * @prop {State | {key: string, routes?: undefined, index?: undefined, isTransitioning?: undefined} | undefined | null} lastState
 * @prop {string} [context]
 *
 * @typedef {object} Payload
 * @prop {string} type
 * @prop {object} action
 * @prop {State | {key: string}} state
 * @prop {State | {key: string} | undefined | null} lastState
 * @prop {string} [context]
 *
 * @typedef {object} Props
 * @prop {object} navigation
 * @prop {Function} navigation.addListener
 * @prop {Function} navigation.removeListener
 * @prop {() => boolean} navigation.isFocused
 * @prop {() => object | undefined} navigation.dangerouslyGetParent
 * @prop {State} navigation.state
 * @prop {(target: string, type: string, data: any) => void} onEvent
 *
 * @extends {React.Component<Props>}
 */

export default class NavigationEventManager extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_actionSubscription", void 0);

    _defineProperty(this, "_willFocusSubscription", void 0);

    _defineProperty(this, "_willBlurSubscription", void 0);

    _defineProperty(this, "_didFocusSubscription", void 0);

    _defineProperty(this, "_didBlurSubscription", void 0);

    _defineProperty(this, "_refocusSubscription", void 0);

    _defineProperty(this, "_lastWillBlurKey", void 0);

    _defineProperty(this, "_lastWillFocusKey", void 0);

    _defineProperty(this, "_lastDidBlurKey", void 0);

    _defineProperty(this, "_lastDidFocusKey", void 0);

    _defineProperty(this, "_handleAction", ({
      state,
      lastState,
      action,
      type,
      context
    }) => {
      var _lastState$routes;

      const {
        navigation,
        onEvent
      } = this.props; // We should only emit events when the navigator is focused
      // When navigator is not focused, screens inside shouldn't receive focused status either

      if (!navigation.isFocused()) {
        return;
      }

      const previous = lastState ? (_lastState$routes = lastState.routes) === null || _lastState$routes === void 0 ? void 0 : _lastState$routes[lastState.index] : undefined;
      const current = state.routes[state.index];
      const payload = {
        context: "".concat(current.key, ":").concat(action.type, "_").concat(context || 'Root'),
        state: current,
        lastState: previous,
        action,
        type
      };

      if ((previous === null || previous === void 0 ? void 0 : previous.key) !== current.key) {
        this._emitWillFocus(current.key, payload);

        if (previous === null || previous === void 0 ? void 0 : previous.key) {
          this._emitWillBlur(previous.key, payload);
        }
      }

      if ((lastState === null || lastState === void 0 ? void 0 : lastState.isTransitioning) !== state.isTransitioning && state.isTransitioning === false) {
        if (this._lastWillBlurKey) {
          this._emitDidBlur(this._lastWillBlurKey, payload);
        }

        if (this._lastWillFocusKey) {
          this._emitDidFocus(this._lastWillFocusKey, payload);
        }
      }

      onEvent(current.key, 'action', payload);
    });

    _defineProperty(this, "_handleWillFocus", ({
      lastState,
      action,
      context,
      type
    }) => {
      var _lastState$routes2;

      const {
        navigation
      } = this.props;
      const route = navigation.state.routes[navigation.state.index];

      this._emitWillFocus(route.key, {
        context: "".concat(route.key, ":").concat(action.type, "_").concat(context || 'Root'),
        state: route,
        lastState: lastState === null || lastState === void 0 ? void 0 : (_lastState$routes2 = lastState.routes) === null || _lastState$routes2 === void 0 ? void 0 : _lastState$routes2.find(r => r.key === route.key),
        action,
        type
      });
    });

    _defineProperty(this, "_handleWillBlur", ({
      lastState,
      action,
      context,
      type
    }) => {
      var _lastState$routes3;

      const {
        navigation
      } = this.props;
      const route = navigation.state.routes[navigation.state.index];

      this._emitWillBlur(route.key, {
        context: "".concat(route.key, ":").concat(action.type, "_").concat(context || 'Root'),
        state: route,
        lastState: lastState === null || lastState === void 0 ? void 0 : (_lastState$routes3 = lastState.routes) === null || _lastState$routes3 === void 0 ? void 0 : _lastState$routes3.find(r => r.key === route.key),
        action,
        type
      });
    });

    _defineProperty(this, "_handleDidFocus", ({
      lastState,
      action,
      context,
      type
    }) => {
      const {
        navigation
      } = this.props;

      if (this._lastWillFocusKey) {
        const route = navigation.state.routes.find(r => r.key === this._lastWillFocusKey);

        if (route) {
          var _lastState$routes4;

          this._emitDidFocus(route.key, {
            context: "".concat(route.key, ":").concat(action.type, "_").concat(context || 'Root'),
            state: route,
            lastState: lastState === null || lastState === void 0 ? void 0 : (_lastState$routes4 = lastState.routes) === null || _lastState$routes4 === void 0 ? void 0 : _lastState$routes4.find(r => r.key === route.key),
            action,
            type
          });
        }
      }
    });

    _defineProperty(this, "_handleDidBlur", ({
      lastState,
      action,
      context,
      type
    }) => {
      const {
        navigation
      } = this.props;

      if (this._lastWillBlurKey) {
        const route = navigation.state.routes.find(r => r.key === this._lastWillBlurKey);

        if (route) {
          var _lastState$routes5;

          this._emitDidBlur(route.key, {
            context: "".concat(route.key, ":").concat(action.type, "_").concat(context || 'Root'),
            state: route,
            lastState: lastState === null || lastState === void 0 ? void 0 : (_lastState$routes5 = lastState.routes) === null || _lastState$routes5 === void 0 ? void 0 : _lastState$routes5.find(r => r.key === route.key),
            action,
            type
          });
        }
      }
    });

    _defineProperty(this, "_handleRefocus", () => {
      const {
        onEvent,
        navigation
      } = this.props;
      const route = navigation.state.routes[navigation.state.index];
      onEvent(route.key, 'refocus');
    });

    _defineProperty(this, "_emitWillFocus", (target, payload) => {
      if (this._lastWillBlurKey === target) {
        this._lastWillBlurKey = undefined;
      }

      if (this._lastWillFocusKey === target) {
        return;
      }

      this._lastDidFocusKey = undefined;
      this._lastWillFocusKey = target;
      const {
        navigation,
        onEvent
      } = this.props;
      onEvent(target, 'willFocus', payload);

      if (typeof navigation.state.isTransitioning !== 'boolean' || navigation.state.isTransitioning !== true && !navigation.dangerouslyGetParent()) {
        this._emitDidFocus(target, payload);
      }
    });

    _defineProperty(this, "_emitWillBlur", (target, payload) => {
      if (this._lastWillFocusKey === target) {
        this._lastWillFocusKey = undefined;
      }

      if (this._lastWillBlurKey === target) {
        return;
      }

      this._lastDidBlurKey = undefined;
      this._lastWillBlurKey = target;
      const {
        navigation,
        onEvent
      } = this.props;
      onEvent(target, 'willBlur', payload);

      if (typeof navigation.state.isTransitioning !== 'boolean' || navigation.state.isTransitioning !== true && !navigation.dangerouslyGetParent()) {
        this._emitDidBlur(target, payload);
      }
    });

    _defineProperty(this, "_emitDidFocus", (target, payload) => {
      if (this._lastWillFocusKey !== target || this._lastDidFocusKey === target) {
        return;
      }

      this._lastDidFocusKey = target;
      const {
        onEvent
      } = this.props;
      onEvent(target, 'didFocus', payload);
    });

    _defineProperty(this, "_emitDidBlur", (target, payload) => {
      if (this._lastWillBlurKey !== target || this._lastDidBlurKey === target) {
        return;
      }

      this._lastDidBlurKey = target;
      const {
        onEvent
      } = this.props;
      onEvent(target, 'didBlur', payload);
    });
  }

  componentDidMount() {
    const {
      navigation
    } = this.props;
    this._actionSubscription = navigation.addListener('action', this._handleAction);
    this._willFocusSubscription = navigation.addListener('willFocus', this._handleWillFocus);
    this._willBlurSubscription = navigation.addListener('willBlur', this._handleWillBlur);
    this._didFocusSubscription = navigation.addListener('didFocus', this._handleDidFocus);
    this._didBlurSubscription = navigation.addListener('didBlur', this._handleDidBlur);
    this._refocusSubscription = navigation.addListener('refocus', this._handleRefocus);
  }

  componentWillUnmount() {
    var _this$_actionSubscrip, _this$_willFocusSubsc, _this$_willBlurSubscr, _this$_didFocusSubscr, _this$_didBlurSubscri, _this$_refocusSubscri;

    (_this$_actionSubscrip = this._actionSubscription) === null || _this$_actionSubscrip === void 0 ? void 0 : _this$_actionSubscrip.remove();
    (_this$_willFocusSubsc = this._willFocusSubscription) === null || _this$_willFocusSubsc === void 0 ? void 0 : _this$_willFocusSubsc.remove();
    (_this$_willBlurSubscr = this._willBlurSubscription) === null || _this$_willBlurSubscr === void 0 ? void 0 : _this$_willBlurSubscr.remove();
    (_this$_didFocusSubscr = this._didFocusSubscription) === null || _this$_didFocusSubscr === void 0 ? void 0 : _this$_didFocusSubscr.remove();
    (_this$_didBlurSubscri = this._didBlurSubscription) === null || _this$_didBlurSubscri === void 0 ? void 0 : _this$_didBlurSubscri.remove();
    (_this$_refocusSubscri = this._refocusSubscription) === null || _this$_refocusSubscri === void 0 ? void 0 : _this$_refocusSubscri.remove();
  }
  /**
   * @type {{ remove(): void } | undefined}
   */


  render() {
    return null;
  }

}
//# sourceMappingURL=NavigationFocusEvents.js.map