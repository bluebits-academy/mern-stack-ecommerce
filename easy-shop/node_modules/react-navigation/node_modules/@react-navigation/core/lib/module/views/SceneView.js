import * as React from 'react';
import NavigationContext from './NavigationContext';
export default class SceneView extends React.PureComponent {
  render() {
    const {
      screenProps,
      component: Component,
      navigation
    } = this.props;
    return /*#__PURE__*/React.createElement(NavigationContext.Provider, {
      value: navigation
    }, /*#__PURE__*/React.createElement(Component, {
      screenProps: screenProps,
      navigation: navigation
    }));
  }

}
//# sourceMappingURL=SceneView.js.map