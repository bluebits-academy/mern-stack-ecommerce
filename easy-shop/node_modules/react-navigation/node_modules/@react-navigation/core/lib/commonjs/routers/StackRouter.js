"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var NavigationActions = _interopRequireWildcard(require("../NavigationActions"));

var StackActions = _interopRequireWildcard(require("./StackActions"));

var _createConfigGetter = _interopRequireDefault(require("./createConfigGetter"));

var _getScreenForRouteName = _interopRequireDefault(require("./getScreenForRouteName"));

var _StateUtils = _interopRequireDefault(require("../StateUtils"));

var _validateRouteConfigMap = _interopRequireDefault(require("./validateRouteConfigMap"));

var _invariant = _interopRequireDefault(require("../utils/invariant"));

var _KeyGenerator = require("./KeyGenerator");

var _pathUtils = require("./pathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function behavesLikePushAction(action) {
  return action.type === NavigationActions.NAVIGATE || action.type === StackActions.PUSH;
}

const defaultActionCreators = () => ({});

function isResetToRootStack(action) {
  return action.type === StackActions.RESET && action.key === null;
}

var _default = (routeConfigs, stackConfig = {}) => {
  // Fail fast on invalid route definitions
  (0, _validateRouteConfigMap.default)(routeConfigs);
  const childRouters = {};
  const routeNames = Object.keys(routeConfigs); // Loop through routes and find child routers

  routeNames.forEach(routeName => {
    // We're not using `getScreenForRouteName` here to preserve the lazy loading
    // behaviour of routes. This means that routes with child routers must be
    // defined using a component directly or with an object with a screen prop.
    const routeConfig = routeConfigs[routeName];
    const screen = routeConfig && routeConfig.screen ? routeConfig.screen : routeConfig;

    if (screen && screen.router) {
      // If it has a router it's a navigator.
      childRouters[routeName] = screen.router;
    } else {
      // If it doesn't have router it's an ordinary React component.
      childRouters[routeName] = null;
    }
  });
  const {
    initialRouteParams
  } = stackConfig;
  const getCustomActionCreators = stackConfig.getCustomActionCreators || defaultActionCreators;
  const initialRouteName = stackConfig.initialRouteName || routeNames[0];
  const initialChildRouter = childRouters[initialRouteName];

  function getInitialState(action) {
    let route = {};
    const childRouter = childRouters[action.routeName]; // This is a push-like action, and childRouter will be a router or null if we are responsible for this routeName

    if (behavesLikePushAction(action) && childRouter !== undefined) {
      let childState = {}; // The router is null for normal leaf routes

      if (childRouter !== null) {
        const childAction = action.action || NavigationActions.init({
          params: action.params
        });
        childState = childRouter.getStateForAction(childAction);
      }

      return {
        key: 'StackRouterRoot',
        isTransitioning: false,
        index: 0,
        routes: [{
          params: action.params,
          ...childState,
          key: action.key || (0, _KeyGenerator.generateKey)(),
          routeName: action.routeName
        }]
      };
    }

    if (initialChildRouter) {
      route = initialChildRouter.getStateForAction(NavigationActions.navigate({
        routeName: initialRouteName,
        params: initialRouteParams
      }));
    }

    const params = (routeConfigs[initialRouteName].params || route.params || action.params || initialRouteParams) && { ...(routeConfigs[initialRouteName].params || {}),
      ...(route.params || {}),
      ...(action.params || {}),
      ...(initialRouteParams || {})
    };
    const {
      initialRouteKey
    } = stackConfig;
    route = { ...route,
      ...(params ? {
        params
      } : {}),
      routeName: initialRouteName,
      key: action.key || initialRouteKey || (0, _KeyGenerator.generateKey)()
    };
    return {
      key: 'StackRouterRoot',
      isTransitioning: false,
      index: 0,
      routes: [route]
    };
  }

  function getParamsForRouteAndAction(routeName, action) {
    let routeConfig = routeConfigs[routeName];

    if (routeConfig && routeConfig.params) {
      return { ...routeConfig.params,
        ...action.params
      };
    } else {
      return action.params;
    }
  }

  const {
    getPathAndParamsForRoute,
    getActionForPathAndParams
  } = (0, _pathUtils.createPathParser)(childRouters, routeConfigs, stackConfig);
  return {
    childRouters,

    getComponentForState(state) {
      const activeChildRoute = state.routes[state.index];
      const {
        routeName
      } = activeChildRoute;

      if (childRouters[routeName]) {
        return childRouters[routeName].getComponentForState(activeChildRoute);
      }

      return (0, _getScreenForRouteName.default)(routeConfigs, routeName);
    },

    getComponentForRouteName(routeName) {
      return (0, _getScreenForRouteName.default)(routeConfigs, routeName);
    },

    getActionCreators(route, navStateKey) {
      return { ...getCustomActionCreators(route, navStateKey),
        pop: (n, params) => StackActions.pop({
          n,
          ...params
        }),
        popToTop: params => StackActions.popToTop(params),
        push: (routeName, params, action) => StackActions.push({
          routeName,
          params,
          action
        }),
        replace: (replaceWith, params, action, newKey) => {
          if (typeof replaceWith === 'string') {
            return StackActions.replace({
              routeName: replaceWith,
              params,
              action,
              key: route.key,
              newKey
            });
          }

          (0, _invariant.default)(typeof replaceWith === 'object', 'Must replaceWith an object or a string');
          (0, _invariant.default)(params == null, 'Params must not be provided to .replace() when specifying an object');
          (0, _invariant.default)(action == null, 'Child action must not be provided to .replace() when specifying an object');
          (0, _invariant.default)(newKey == null, 'Child action must not be provided to .replace() when specifying an object');
          return StackActions.replace(replaceWith);
        },
        reset: (actions, index) => StackActions.reset({
          actions,
          index: index == null ? actions.length - 1 : index,
          key: navStateKey
        }),
        dismiss: () => NavigationActions.back({
          key: navStateKey
        })
      };
    },

    getStateForAction(action, state) {
      // Set up the initial state if needed
      if (!state) {
        return getInitialState(action);
      }

      const activeChildRoute = state.routes[state.index];

      if (!isResetToRootStack(action) && action.type !== NavigationActions.NAVIGATE) {
        // Let the active child router handle the action
        const activeChildRouter = childRouters[activeChildRoute.routeName];

        if (activeChildRouter) {
          const route = activeChildRouter.getStateForAction(action, activeChildRoute);

          if (route !== null && route !== activeChildRoute) {
            return _StateUtils.default.replaceAt(state, activeChildRoute.key, route, // the following tells replaceAt to NOT change the index to this route for the setParam action, because people don't expect param-setting actions to switch the active route
            action.type === NavigationActions.SET_PARAMS);
          }
        }
      } else if (action.type === NavigationActions.NAVIGATE) {
        // Traverse routes from the top of the stack to the bottom, so the
        // active route has the first opportunity, then the one before it, etc.
        for (let childRoute of state.routes.slice().reverse()) {
          let childRouter = childRouters[childRoute.routeName];
          let childAction = action.routeName === childRoute.routeName && action.action ? action.action : action;

          if (childRouter) {
            const nextRouteState = childRouter.getStateForAction(childAction, childRoute);

            if (nextRouteState === null || nextRouteState !== childRoute) {
              const newState = _StateUtils.default.replaceAndPrune(state, nextRouteState ? nextRouteState.key : childRoute.key, nextRouteState ? nextRouteState : childRoute);

              return { ...newState,
                isTransitioning: state.index !== newState.index ? action.immediate !== true : state.isTransitioning
              };
            }
          }
        }
      } // Handle push and navigate actions. This must happen after the focused
      // child router has had a chance to handle the action.


      if (behavesLikePushAction(action) && childRouters[action.routeName] !== undefined // undefined means it's not a childRouter or a screen
      ) {
          const childRouter = childRouters[action.routeName];
          let route;
          (0, _invariant.default)(action.type !== StackActions.PUSH || action.key == null, 'StackRouter does not support key on the push action'); // Before pushing a new route we first try to find one in the existing route stack
          // More information on this: https://github.com/react-navigation/rfcs/blob/master/text/0004-less-pushy-navigate.md

          const lastRouteIndex = state.routes.findIndex(r => {
            if (action.key) {
              return r.key === action.key;
            } else {
              return r.routeName === action.routeName;
            }
          }); // An instance of this route exists already and we're dealing with a navigate action

          if (action.type !== StackActions.PUSH && lastRouteIndex !== -1) {
            // If index is unchanged and params are not being set, leave state identity intact
            if (state.index === lastRouteIndex && !action.params) {
              return null;
            } // Remove the now unused routes at the tail of the routes array


            const routes = state.routes.slice(0, lastRouteIndex + 1); // Apply params if provided, otherwise leave route identity intact

            if (action.params) {
              const route = state.routes[lastRouteIndex];
              routes[lastRouteIndex] = { ...route,
                params: { ...route.params,
                  ...action.params
                }
              };
            } // Return state with new index. Change isTransitioning only if index has changed


            return { ...state,
              isTransitioning: state.index !== lastRouteIndex ? action.immediate !== true : state.isTransitioning,
              index: lastRouteIndex,
              routes
            };
          }

          if (childRouter) {
            // Delegate to the child router with the given action, or init it
            const childAction = action.action || NavigationActions.init({
              params: getParamsForRouteAndAction(action.routeName, action)
            });
            route = {
              params: getParamsForRouteAndAction(action.routeName, action),
              // note(brentvatne): does it make sense to wipe out the params
              // here? or even to add params at all? need more info about what
              // this solves
              ...childRouter.getStateForAction(childAction),
              routeName: action.routeName,
              key: action.key || (0, _KeyGenerator.generateKey)()
            };
          } else {
            // Create the route from scratch
            route = {
              params: getParamsForRouteAndAction(action.routeName, action),
              routeName: action.routeName,
              key: action.key || (0, _KeyGenerator.generateKey)()
            };
          }

          return { ..._StateUtils.default.push(state, route),
            isTransitioning: action.immediate !== true
          };
        } else if (action.type === StackActions.PUSH && childRouters[action.routeName] === undefined) {
        // Return the state identity to bubble the action up
        return state;
      } // Handle navigation to other child routers that are not yet pushed


      if (behavesLikePushAction(action)) {
        const childRouterNames = Object.keys(childRouters);

        for (let i = 0; i < childRouterNames.length; i++) {
          const childRouterName = childRouterNames[i];
          const childRouter = childRouters[childRouterName];

          if (childRouter) {
            // For each child router, start with a blank state
            const initChildRoute = childRouter.getStateForAction(NavigationActions.init()); // Then check to see if the router handles our navigate action

            const navigatedChildRoute = childRouter.getStateForAction(action, initChildRoute);
            let routeToPush = null;

            if (navigatedChildRoute === null) {
              // Push the route if the router has 'handled' the action and returned null
              routeToPush = initChildRoute;
            } else if (navigatedChildRoute !== initChildRoute) {
              // Push the route if the state has changed in response to this navigation
              routeToPush = navigatedChildRoute;
            }

            if (routeToPush) {
              const route = { ...routeToPush,
                routeName: childRouterName,
                key: action.key || (0, _KeyGenerator.generateKey)()
              };
              return { ..._StateUtils.default.push(state, route),
                isTransitioning: action.immediate !== true
              };
            }
          }
        }
      } // Handle pop-to-top behavior. Make sure this happens after children have had a chance to handle the action, so that the inner stack pops to top first.


      if (action.type === StackActions.POP_TO_TOP) {
        // Refuse to handle pop to top if a key is given that doesn't correspond
        // to this router
        if (action.key && state.key !== action.key) {
          return state;
        } // If we're already at the top, then we return the state with a new
        // identity so that the action is handled by this router.


        if (state.index > 0) {
          return { ...state,
            isTransitioning: action.immediate !== true,
            index: 0,
            routes: [state.routes[0]]
          };
        }

        return state;
      } // Handle replace action


      if (action.type === StackActions.REPLACE) {
        let routeIndex; // If the key param is undefined, set the index to the last route in the stack

        if (action.key === undefined && state.routes.length) {
          routeIndex = state.routes.length - 1;
        } else {
          routeIndex = state.routes.findIndex(r => r.key === action.key);
        } // Only replace if the key matches one of our routes


        if (routeIndex !== -1) {
          const childRouter = childRouters[action.routeName];
          let childState = {};

          if (childRouter) {
            const childAction = action.action || NavigationActions.init({
              params: getParamsForRouteAndAction(action.routeName, action)
            });
            childState = childRouter.getStateForAction(childAction);
          }

          const routes = [...state.routes];
          routes[routeIndex] = {
            params: getParamsForRouteAndAction(action.routeName, action),
            // merge the child state in this order to allow params override
            ...childState,
            routeName: action.routeName,
            key: action.newKey || (0, _KeyGenerator.generateKey)()
          };
          return { ...state,
            routes
          };
        }
      } // Update transitioning state


      if (action.type === StackActions.COMPLETE_TRANSITION && (action.key == null || action.key === state.key) && action.toChildKey === state.routes[state.index].key && state.isTransitioning) {
        return { ...state,
          isTransitioning: false
        };
      }

      if (action.type === NavigationActions.SET_PARAMS) {
        const key = action.key;
        const lastRoute = state.routes.find(route => route.key === key);

        if (lastRoute) {
          const params = { ...lastRoute.params,
            ...action.params
          };
          const routes = [...state.routes];
          routes[state.routes.indexOf(lastRoute)] = { ...lastRoute,
            params
          };
          return { ...state,
            routes
          };
        }
      }

      if (action.type === StackActions.RESET) {
        // Only handle reset actions that are unspecified or match this state key
        if (action.key != null && action.key !== state.key) {
          // Deliberately use != instead of !== so we can match null with
          // undefined on either the state or the action
          return state;
        }

        const newStackActions = action.actions;
        return { ...state,
          routes: newStackActions.map(newStackAction => {
            const router = childRouters[newStackAction.routeName];
            let childState = {};

            if (router) {
              const childAction = newStackAction.action || NavigationActions.init({
                params: getParamsForRouteAndAction(newStackAction.routeName, newStackAction)
              });
              childState = router.getStateForAction(childAction);
            }

            return {
              params: getParamsForRouteAndAction(newStackAction.routeName, newStackAction),
              ...childState,
              routeName: newStackAction.routeName,
              key: newStackAction.key || (0, _KeyGenerator.generateKey)()
            };
          }),
          index: action.index
        };
      }

      if (action.type === NavigationActions.BACK || action.type === StackActions.POP) {
        const {
          key,
          n,
          immediate,
          prune
        } = action;

        if (action.type === StackActions.POP && prune === false && key) {
          const index = state.routes.findIndex(r => r.key === key);

          if (index > 0) {
            const count = Math.max(index - (n !== null && n !== void 0 ? n : 1) + 1, 1);
            const routes = state.routes.slice(0, count).concat(state.routes.slice(index + 1));

            if (routes.length) {
              return { ...state,
                routes,
                index: routes.length - 1,
                isTransitioning: immediate !== true
              };
            }
          }
        } else {
          let backRouteIndex = state.index;

          if (action.type === StackActions.POP && n != null) {
            // determine the index to go back *from*. In this case, n=1 means to go
            // back from state.index, as if it were a normal "BACK" action
            backRouteIndex = Math.max(1, state.index - n + 1);
          } else if (key) {
            const backRoute = state.routes.find(route => route.key === key);
            backRouteIndex = state.routes.indexOf(backRoute);
          }

          if (backRouteIndex > 0) {
            return { ...state,
              routes: state.routes.slice(0, backRouteIndex),
              index: backRouteIndex - 1,
              isTransitioning: immediate !== true
            };
          }
        }
      } // By this point in the router's state handling logic, we have handled the behavior of the active route, and handled any stack actions.
      // If we haven't returned by now, we should allow non-active child routers to handle this action, and switch to that index if the child state (route) does change..


      const keyIndex = action.key ? _StateUtils.default.indexOf(state, action.key) : -1; // Traverse routes from the top of the stack to the bottom, so the
      // active route has the first opportunity, then the one before it, etc.

      for (let childRoute of state.routes.slice().reverse()) {
        if (childRoute.key === activeChildRoute.key) {
          // skip over the active child because we let it attempt to handle the action earlier
          continue;
        } // If a key is provided and in routes state then let's use that
        // knowledge to skip extra getStateForAction calls on other child
        // routers


        if (keyIndex >= 0 && childRoute.key !== action.key) {
          continue;
        }

        let childRouter = childRouters[childRoute.routeName];

        if (childRouter) {
          const route = childRouter.getStateForAction(action, childRoute);

          if (route === null) {
            return state;
          } else if (route && route !== childRoute) {
            return _StateUtils.default.replaceAt(state, childRoute.key, route, // People don't expect these actions to switch the active route
            // TODO: We should switch to action.preserveFocus: true for drawer in future
            action.preserveFocus || action.type.includes('DRAWER'));
          }
        }
      }

      return state;
    },

    getPathAndParamsForState(state) {
      const route = state.routes[state.index];
      return getPathAndParamsForRoute(route);
    },

    getActionForPathAndParams(path, params) {
      return getActionForPathAndParams(path, params);
    },

    getScreenOptions: (0, _createConfigGetter.default)(routeConfigs, stackConfig.defaultNavigationOptions)
  };
};

exports.default = _default;
//# sourceMappingURL=StackRouter.js.map