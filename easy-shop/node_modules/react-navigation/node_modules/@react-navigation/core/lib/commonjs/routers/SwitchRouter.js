"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("../utils/invariant"));

var _getScreenForRouteName = _interopRequireDefault(require("./getScreenForRouteName"));

var _createConfigGetter = _interopRequireDefault(require("./createConfigGetter"));

var NavigationActions = _interopRequireWildcard(require("../NavigationActions"));

var SwitchActions = _interopRequireWildcard(require("./SwitchActions"));

var StackActions = _interopRequireWildcard(require("./StackActions"));

var _validateRouteConfigMap = _interopRequireDefault(require("./validateRouteConfigMap"));

var _pathUtils = require("./pathUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultActionCreators = () => ({});

var _default = (routeConfigs, config = {}) => {
  // Fail fast on invalid route definitions
  (0, _validateRouteConfigMap.default)(routeConfigs);
  const order = config.order || Object.keys(routeConfigs);
  const getCustomActionCreators = config.getCustomActionCreators || defaultActionCreators;
  const {
    initialRouteParams
  } = config;
  const initialRouteName = config.initialRouteName || order[0];
  const backBehavior = config.backBehavior || 'none';
  const resetOnBlur = config.hasOwnProperty('resetOnBlur') ? config.resetOnBlur : true;
  const initialRouteIndex = order.indexOf(initialRouteName);

  if (initialRouteIndex === -1) {
    throw new Error("Invalid initialRouteName '".concat(initialRouteName, "'.") + "Should be one of ".concat(order.map(n => "\"".concat(n, "\"")).join(', ')));
  }

  const childRouters = {};
  order.forEach(routeName => {
    childRouters[routeName] = null;
    const screen = (0, _getScreenForRouteName.default)(routeConfigs, routeName);

    if (screen.router) {
      childRouters[routeName] = screen.router;
    }
  });

  function getParamsForRoute(routeName, params) {
    let routeConfig = routeConfigs[routeName];

    if (routeConfig && routeConfig.params) {
      return { ...routeConfig.params,
        ...params
      };
    } else {
      return params;
    }
  }

  const {
    getPathAndParamsForRoute,
    getActionForPathAndParams
  } = (0, _pathUtils.createPathParser)(childRouters, routeConfigs, config);

  function resetChildRoute(routeName) {
    let initialParams = routeName === initialRouteName ? initialRouteParams : null; // note(brentvatne): merging initialRouteParams *on top* of default params
    // on the route seems incorrect but it's consistent with existing behavior
    // in stackrouter

    let params = getParamsForRoute(routeName, initialParams);
    const childRouter = childRouters[routeName];

    if (childRouter) {
      const childAction = NavigationActions.init();
      return { ...childRouter.getStateForAction(childAction),
        key: routeName,
        routeName,
        ...(params ? {
          params
        } : {})
      };
    }

    return {
      key: routeName,
      routeName,
      ...(params ? {
        params
      } : {})
    };
  }

  function getNextState(action, prevState, possibleNextState) {
    function updateNextStateHistory(prevState, nextState) {
      if (backBehavior !== 'history' || prevState && nextState && nextState.index === prevState.index) {
        return nextState;
      }

      let nextRouteKeyHistory = prevState ? prevState.routeKeyHistory : [];

      if (action.type === NavigationActions.NAVIGATE) {
        nextRouteKeyHistory = [...nextRouteKeyHistory]; // copy

        const keyToAdd = nextState.routes[nextState.index].key;
        nextRouteKeyHistory = nextRouteKeyHistory.filter(k => k !== keyToAdd); // dedup

        nextRouteKeyHistory.push(keyToAdd);
      } else if (action.type === NavigationActions.BACK) {
        nextRouteKeyHistory = [...nextRouteKeyHistory]; // copy

        nextRouteKeyHistory.pop();
      }

      return { ...nextState,
        routeKeyHistory: nextRouteKeyHistory
      };
    }

    let nextState = possibleNextState;

    if (prevState && possibleNextState && prevState.index !== possibleNextState.index && resetOnBlur) {
      const prevRouteName = prevState.routes[prevState.index].routeName;
      const nextRoutes = [...possibleNextState.routes];
      nextRoutes[prevState.index] = resetChildRoute(prevRouteName);
      nextState = { ...possibleNextState,
        routes: nextRoutes
      };
    }

    return updateNextStateHistory(prevState, nextState);
  }

  function getInitialState() {
    const routes = order.map(resetChildRoute);
    const initialState = {
      routes,
      index: initialRouteIndex
    };

    if (backBehavior === 'history') {
      const initialKey = routes[initialRouteIndex].key;
      initialState['routeKeyHistory'] = [initialKey];
    }

    return initialState;
  }

  return {
    childRouters,

    getActionCreators(route, stateKey) {
      return getCustomActionCreators(route, stateKey);
    },

    getStateForAction(action, inputState) {
      let prevState = inputState ? { ...inputState
      } : inputState;
      let state = inputState || getInitialState();
      let activeChildIndex = state.index;

      if (action.type === NavigationActions.INIT) {
        // NOTE(brentvatne): this seems weird... why are we merging these
        // params into child routes?
        // ---------------------------------------------------------------
        // Merge any params from the action into all the child routes
        const {
          params
        } = action;

        if (params) {
          state.routes = state.routes.map(route => ({ ...route,
            params: { ...route.params,
              ...params,
              ...(route.routeName === initialRouteName ? initialRouteParams : null)
            }
          }));
        }
      }

      if (action.type === SwitchActions.JUMP_TO && (action.key == null || action.key === state.key)) {
        const {
          params
        } = action;
        const index = state.routes.findIndex(route => route.routeName === action.routeName);

        if (index === -1) {
          throw new Error("There is no route named '".concat(action.routeName, "' in the navigator with the key '").concat(action.key, "'.\n") + "Must be one of: ".concat(state.routes.map(route => "'".concat(route.routeName, "'")).join(',')));
        }

        return getNextState(action, prevState, { ...state,
          routes: params ? state.routes.map((route, i) => i === index ? { ...route,
            params: { ...route.params,
              ...params
            }
          } : route) : state.routes,
          index
        });
      } // Let the current child handle it


      const activeChildLastState = state.routes[state.index];
      const activeChildRouter = childRouters[order[state.index]];

      if (activeChildRouter) {
        const activeChildState = activeChildRouter.getStateForAction(action, activeChildLastState);

        if (!activeChildState && inputState) {
          return null;
        }

        if (activeChildState && activeChildState !== activeChildLastState) {
          const routes = [...state.routes];
          routes[state.index] = activeChildState;
          return getNextState(action, prevState, { ...state,
            routes
          });
        }
      } // Handle tab changing. Do this after letting the current tab try to
      // handle the action, to allow inner children to change first


      const isBackEligible = action.key == null || action.key === activeChildLastState.key;

      if (action.type === NavigationActions.BACK) {
        if (isBackEligible && backBehavior === 'initialRoute') {
          activeChildIndex = initialRouteIndex;
        } else if (isBackEligible && backBehavior === 'order') {
          activeChildIndex = Math.max(0, activeChildIndex - 1);
        } // The history contains current route, so we can only go back
        // if there is more than one item in the history
        else if (isBackEligible && backBehavior === 'history' && state.routeKeyHistory.length > 1) {
            const routeKey = state.routeKeyHistory[state.routeKeyHistory.length - 2];
            activeChildIndex = order.indexOf(routeKey);
          }
      }

      let didNavigate = false;

      if (action.type === NavigationActions.NAVIGATE) {
        didNavigate = !!order.find((childId, i) => {
          if (childId === action.routeName) {
            activeChildIndex = i;
            return true;
          }

          return false;
        });

        if (didNavigate) {
          const childState = state.routes[activeChildIndex];
          const childRouter = childRouters[action.routeName];
          let newChildState = childState;

          if (action.action && childRouter) {
            const childStateUpdate = childRouter.getStateForAction(action.action, childState);

            if (childStateUpdate) {
              newChildState = childStateUpdate;
            }
          }

          if (action.params) {
            newChildState = { ...newChildState,
              params: { ...(newChildState.params || {}),
                ...action.params
              }
            };
          }

          if (newChildState !== childState) {
            const routes = [...state.routes];
            routes[activeChildIndex] = newChildState;
            const nextState = { ...state,
              routes,
              index: activeChildIndex
            };
            return getNextState(action, prevState, nextState);
          } else if (newChildState === childState && state.index === activeChildIndex && prevState) {
            return null;
          }
        }
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
          return getNextState(action, prevState, { ...state,
            routes
          });
        }
      }

      if (activeChildIndex !== state.index) {
        return getNextState(action, prevState, { ...state,
          index: activeChildIndex
        });
      } else if (didNavigate && !inputState) {
        return state;
      } else if (didNavigate) {
        return { ...state
        };
      }

      const isActionBackOrPop = action.type === NavigationActions.BACK || action.type === StackActions.POP || action.type === StackActions.POP_TO_TOP;
      const sendActionToInactiveChildren = !isActionBackOrPop || action.type === NavigationActions.BACK && action.key != null; // Let other children handle it and switch to the first child that returns a new state
      // Do not do this for StackActions.POP or NavigationActions.BACK actions without a key:
      // it would be unintuitive for these actions to switch to another tab just because that tab had a Stack that could accept a back action

      if (sendActionToInactiveChildren) {
        let index = state.index;
        let routes = state.routes;
        order.find((childId, i) => {
          const childRouter = childRouters[childId];

          if (i === index) {
            return false;
          }

          let childState = routes[i];

          if (childRouter) {
            childState = childRouter.getStateForAction(action, childState);
          }

          if (!childState) {
            index = i;
            return true;
          }

          if (childState !== routes[i]) {
            routes = [...routes];
            routes[i] = childState;
            index = i;
            return true;
          }

          return false;
        }); // Nested routers can be updated after switching children with actions such as SET_PARAMS
        // and COMPLETE_TRANSITION.

        if (action.preserveFocus) {
          index = state.index;
        }

        if (index !== state.index || routes !== state.routes) {
          return getNextState(action, prevState, { ...state,
            index,
            routes
          });
        }
      }

      return state;
    },

    getComponentForState(state) {
      const routeName = state.routes[state.index].routeName;
      (0, _invariant.default)(routeName, "There is no route defined for index ".concat(state.index, ". Check that\n        that you passed in a navigation state with a valid tab/screen index."));
      const childRouter = childRouters[routeName];

      if (childRouter) {
        return childRouter.getComponentForState(state.routes[state.index]);
      }

      return (0, _getScreenForRouteName.default)(routeConfigs, routeName);
    },

    getComponentForRouteName(routeName) {
      return (0, _getScreenForRouteName.default)(routeConfigs, routeName);
    },

    getPathAndParamsForState(state) {
      const route = state.routes[state.index];
      return getPathAndParamsForRoute(route);
    },

    getActionForPathAndParams(path, params) {
      return getActionForPathAndParams(path, params);
    },

    getScreenOptions: (0, _createConfigGetter.default)(routeConfigs, config.defaultNavigationOptions)
  };
};

exports.default = _default;
//# sourceMappingURL=SwitchRouter.js.map