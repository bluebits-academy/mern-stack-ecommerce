"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SwitchRouter = _interopRequireDefault(require("./SwitchRouter"));

var _withDefaultValue = _interopRequireDefault(require("../utils/withDefaultValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (routeConfigs, config = {}) => {
  config = { ...config
  };
  config = (0, _withDefaultValue.default)(config, 'resetOnBlur', false);
  config = (0, _withDefaultValue.default)(config, 'backBehavior', 'initialRoute');
  const switchRouter = (0, _SwitchRouter.default)(routeConfigs, config);
  return switchRouter;
};

exports.default = _default;
//# sourceMappingURL=TabRouter.js.map