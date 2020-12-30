"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _invariant = _interopRequireDefault(require("../utils/invariant"));

var _ThemeContext = _interopRequireDefault(require("../views/ThemeContext"));

var _NavigationFocusEvents = _interopRequireDefault(require("../views/NavigationFocusEvents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createNavigator(NavigatorView, router, navigationConfig) {
  class Navigator extends React.Component {
    // eslint-disable-next-line react/sort-comp
    constructor(props, context) {
      super(props, context);
      this.state = {
        descriptors: {},
        screenProps: this.props.screenProps,
        theme: context,
        themeContext: context
      };
    }

    static getDerivedStateFromProps(nextProps, currentState) {
      const prevDescriptors = currentState.descriptors;
      const {
        navigation,
        screenProps
      } = nextProps;
      (0, _invariant.default)(navigation != null, 'The navigation prop is missing for this navigator. In react-navigation v3 and v4 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html');
      const {
        state
      } = navigation;
      const {
        routes
      } = state;

      if (typeof routes === 'undefined') {
        throw new TypeError('No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop');
      }

      const descriptors = routes.reduce((descriptors, route) => {
        if (prevDescriptors && prevDescriptors[route.key] && route === prevDescriptors[route.key].state && screenProps === currentState.screenProps && currentState.themeContext === currentState.theme) {
          descriptors[route.key] = prevDescriptors[route.key];
          return descriptors;
        }

        const getComponent = router.getComponentForRouteName.bind(null, route.routeName);
        const childNavigation = navigation.getChildNavigation(route.key);
        const options = router.getScreenOptions(childNavigation, screenProps, currentState.themeContext);
        descriptors[route.key] = {
          key: route.key,
          getComponent,
          options,
          state: route,
          navigation: childNavigation
        };
        return descriptors;
      }, {});
      return {
        descriptors,
        screenProps,
        theme: state.themeContext
      };
    }

    componentDidUpdate() {
      if (this.context !== this.state.themeContext) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          themeContext: this.context
        });
      }
    }

    render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_NavigationFocusEvents.default, {
        navigation: this.props.navigation,
        onEvent: (target, type, data) => {
          var _this$state$descripto;

          (_this$state$descripto = this.state.descriptors[target]) === null || _this$state$descripto === void 0 ? void 0 : _this$state$descripto.navigation.emit(type, data);
        }
      }), /*#__PURE__*/React.createElement(NavigatorView, _extends({}, this.props, {
        screenProps: this.state.screenProps,
        navigation: this.props.navigation,
        navigationConfig: navigationConfig,
        descriptors: this.state.descriptors
      })));
    }

  }

  _defineProperty(Navigator, "contextType", _ThemeContext.default);

  _defineProperty(Navigator, "router", router);

  _defineProperty(Navigator, "navigationOptions", navigationConfig.navigationOptions);

  return Navigator;
}

var _default = createNavigator;
exports.default = _default;
//# sourceMappingURL=createNavigator.js.map