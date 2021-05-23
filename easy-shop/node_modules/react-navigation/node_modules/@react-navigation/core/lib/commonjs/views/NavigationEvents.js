"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _withNavigation = _interopRequireDefault(require("./withNavigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EventNameToPropName = {
  willFocus: 'onWillFocus',
  didFocus: 'onDidFocus',
  willBlur: 'onWillBlur',
  didBlur: 'onDidBlur'
};
const EventNames = Object.keys(EventNameToPropName);

class NavigationEvents extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getPropListener", eventName => this.props[EventNameToPropName[eventName]]);
  }

  componentDidMount() {
    // We register all navigation listeners on mount to ensure listener stability across re-render
    // A former implementation was replacing (removing/adding) listeners on all update (if prop provided)
    // but there were issues (see https://github.com/react-navigation/react-navigation/issues/5058)
    this.subscribeAll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation !== prevProps.navigation) {
      this.removeAll();
      this.subscribeAll();
    }
  }

  componentWillUnmount() {
    this.removeAll();
  }

  subscribeAll() {
    this.subscriptions = {};
    EventNames.forEach(eventName => {
      this.subscriptions[eventName] = this.props.navigation.addListener(eventName, (...args) => {
        const propListener = this.getPropListener(eventName);
        return propListener && propListener(...args);
      });
    });
  }

  removeAll() {
    EventNames.forEach(eventName => {
      this.subscriptions[eventName].remove();
    });
  }

  render() {
    return null;
  }

}

var _default = (0, _withNavigation.default)(NavigationEvents);

exports.default = _default;
//# sourceMappingURL=NavigationEvents.js.map