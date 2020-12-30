"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getChildRouter;

function getChildRouter(router, routeName) {
  var _router$childRouters;

  if ((_router$childRouters = router.childRouters) === null || _router$childRouters === void 0 ? void 0 : _router$childRouters[routeName]) {
    return router.childRouters[routeName];
  }

  const Component = router.getComponentForRouteName(routeName);
  return Component.router;
}
//# sourceMappingURL=getChildRouter.js.map