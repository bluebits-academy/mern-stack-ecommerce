/// <reference types="react" />
import { TabNavigationState, ParamListBase } from '@react-navigation/native';
import type { MaterialTopTabDescriptorMap, MaterialTopTabNavigationConfig, MaterialTopTabNavigationHelpers } from '../types';
declare type Props = MaterialTopTabNavigationConfig & {
    state: TabNavigationState<ParamListBase>;
    navigation: MaterialTopTabNavigationHelpers;
    descriptors: MaterialTopTabDescriptorMap;
    tabBarPosition?: 'top' | 'bottom';
};
export default function MaterialTopTabView({ pager, lazyPlaceholder, tabBar, tabBarOptions, state, navigation, descriptors, sceneContainerStyle, ...rest }: Props): JSX.Element;
export {};
