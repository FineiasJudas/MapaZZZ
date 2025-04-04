import type { DefaultRouterOptions, NavigationState, ParamListBase, Router } from './types';
export type TabActionType = {
    type: 'JUMP_TO';
    payload: {
        name: string;
        params?: object;
    };
    source?: string;
    target?: string;
};
export type BackBehavior = 'initialRoute' | 'firstRoute' | 'history' | 'order' | 'none';
export type TabRouterOptions = DefaultRouterOptions & {
    backBehavior?: BackBehavior;
};
export type TabNavigationState<ParamList extends ParamListBase> = Omit<NavigationState<ParamList>, 'history'> & {
    /**
     * Type of the router, in this case, it's tab.
     */
    type: 'tab';
    /**
     * List of previously visited route keys.
     */
    history: {
        type: 'route';
        key: string;
    }[];
    /**
     * List of routes' key, which are supposed to be preloaded before navigating to.
     */
    preloadedRouteKeys: string[];
};
export type TabActionHelpers<ParamList extends ParamListBase> = {
    /**
     * Jump to an existing tab.
     *
     * @param screen Name of the route to jump to.
     * @param [params] Params object for the route.
     */
    jumpTo<RouteName extends Extract<keyof ParamList, string>>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName, params?: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]] : never): void;
};
export declare const TabActions: {
    jumpTo(name: string, params?: object): TabActionType;
};
export declare function TabRouter({ initialRouteName, backBehavior, }: TabRouterOptions): Router<TabNavigationState<ParamListBase>, import("./CommonActions").Action | TabActionType>;
//# sourceMappingURL=TabRouter.d.ts.map