function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ScrollView, Platform, FlatList, SectionList, RefreshControl } from 'react-native';
import { ScrollView as GHScrollView } from 'react-native-gesture-handler';
import createNavigationAwareScrollable from './createNavigationAwareScrollable';
import invariant from './utils/invariant';
let WrappedScrollView;

if (Platform.OS === 'android') {
  // @todo: use GHScrollView again when
  // https://github.com/kmagiera/react-native-gesture-handler/issues/560 has
  // been fixed.
  WrappedScrollView = createNavigationAwareScrollable(ScrollView);
} else {
  WrappedScrollView = createNavigationAwareScrollable(GHScrollView);
}

function propsMaybeWithRefreshControl(props) {
  const onRefresh = props.onRefresh;

  if (onRefresh) {
    invariant(typeof props.refreshing === 'boolean', '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' + JSON.stringify(props.refreshing) + '`');
    return { ...props,
      refreshControl: props.refreshControl == null ? /*#__PURE__*/React.createElement(RefreshControl, {
        refreshing: props.refreshing,
        onRefresh: onRefresh,
        progressViewOffset: props.progressViewOffset
      }) : props.refreshControl
    };
  } else {
    return props;
  }
}

const WrappedFlatList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(FlatList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: props => /*#__PURE__*/React.createElement(WrappedScrollView, propsMaybeWithRefreshControl(props))
})));
const WrappedSectionList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(SectionList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: props => /*#__PURE__*/React.createElement(WrappedScrollView, propsMaybeWithRefreshControl(props))
})));
export { WrappedScrollView as ScrollView, WrappedFlatList as FlatList, WrappedSectionList as SectionList };
//# sourceMappingURL=Scrollables.js.map