"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createNavigator = _interopRequireDefault(require("../navigators/createNavigator"));

var _SwitchRouter = _interopRequireDefault(require("../routers/SwitchRouter"));

var _SwitchView = _interopRequireDefault(require("../views/SwitchView/SwitchView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSwitchNavigator(routeConfigMap, switchConfig = {}) {
  const router = (0, _SwitchRouter.default)(routeConfigMap, switchConfig);
  const Navigator = (0, _createNavigator.default)(_SwitchView.default, router, switchConfig);
  return Navigator;
}

var _default = createSwitchNavigator;
exports.default = _default;
//# sourceMappingURL=createSwitchNavigator.js.map