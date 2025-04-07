"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLinkBuilder = useLinkBuilder;
var _core = require("@react-navigation/core");
var React = _interopRequireWildcard(require("react"));
var _LinkingContext = require("./LinkingContext.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Helpers to build href or action based on the linking options.
 *
 * @returns `buildHref` to build an `href` for screen and `buildAction` to build an action from an `href`.
 */
function useLinkBuilder() {
  const navigation = React.useContext(_core.NavigationHelpersContext);
  const route = React.useContext(_core.NavigationRouteContext);
  const {
    options
  } = React.useContext(_LinkingContext.LinkingContext);
  const focusedRouteState = (0, _core.useStateForPath)();
  const getPathFromStateHelper = options?.getPathFromState ?? _core.getPathFromState;
  const getStateFromPathHelper = options?.getStateFromPath ?? _core.getStateFromPath;
  const getActionFromStateHelper = options?.getActionFromState ?? _core.getActionFromState;
  const buildHref = React.useCallback((name, params) => {
    if (options?.enabled === false) {
      return undefined;
    }

    // Check that we're inside:
    // - navigator's context
    // - route context of the navigator (could be a screen, tab, etc.)
    // - route matches the state for path (from the screen's context)
    // This ensures that we're inside a screen
    const isScreen = navigation && route?.key && focusedRouteState ? route.key === (0, _core.findFocusedRoute)(focusedRouteState)?.key && navigation.getState().routes.some(r => r.key === route.key) : false;
    const stateForRoute = {
      routes: [{
        name,
        params
      }]
    };
    const constructState = state => {
      if (state) {
        const route = state.routes[0];

        // If we're inside a screen and at the innermost route
        // We need to replace the state with the provided one
        // This assumes that we're navigating to a sibling route
        if (isScreen && !route.state) {
          return stateForRoute;
        }

        // Otherwise, dive into the nested state of the route
        return {
          routes: [{
            ...route,
            state: constructState(route.state)
          }]
        };
      }

      // Once there is no more nested state, we're at the innermost route
      // We can add a state based on provided parameters
      // This assumes that we're navigating to a child of this route
      // In this case, the helper is used in a navigator for its routes
      return stateForRoute;
    };
    const state = constructState(focusedRouteState);
    const path = getPathFromStateHelper(state, options?.config);
    return path;
  }, [options?.enabled, options?.config, route?.key, navigation, focusedRouteState, getPathFromStateHelper]);
  const buildAction = React.useCallback(href => {
    if (!href.startsWith('/')) {
      throw new Error(`The href must start with '/' (${href}).`);
    }
    const state = getStateFromPathHelper(href, options?.config);
    if (state) {
      const action = getActionFromStateHelper(state, options?.config);
      return action ?? _core.CommonActions.reset(state);
    } else {
      throw new Error('Failed to parse the href to a navigation state.');
    }
  }, [options?.config, getStateFromPathHelper, getActionFromStateHelper]);
  return {
    buildHref,
    buildAction
  };
}
//# sourceMappingURL=useLinkBuilder.js.map