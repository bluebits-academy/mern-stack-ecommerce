function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SceneView } from '@react-navigation/core';
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container,
      collapsable: false,
      removeClippedSubviews: Platform.OS === 'android' ? removeClippedSubviews : !isFocused && removeClippedSubviews
    }, /*#__PURE__*/React.createElement(View, {
      style: this._mustAlwaysBeVisible() || isFocused ? styles.innerAttached : styles.innerDetached
    }, awake ? /*#__PURE__*/React.createElement(SceneView, _extends({}, rest, {
      navigation: childNavigation
    })) : null));
  }

}

const styles = StyleSheet.create({
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
export default ResourceSavingSceneView;
//# sourceMappingURL=ResourceSavingSceneView.js.map