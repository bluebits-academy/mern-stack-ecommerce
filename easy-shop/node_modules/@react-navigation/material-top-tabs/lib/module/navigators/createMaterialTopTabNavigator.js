function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { useNavigationBuilder, createNavigatorFactory, TabRouter } from '@react-navigation/native';
import MaterialTopTabView from '../views/MaterialTopTabView';

function MaterialTopTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const {
    state,
    descriptors,
    navigation
  } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions
  });
  return /*#__PURE__*/React.createElement(MaterialTopTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  }));
}

export default createNavigatorFactory(MaterialTopTabNavigator);
//# sourceMappingURL=createMaterialTopTabNavigator.js.map