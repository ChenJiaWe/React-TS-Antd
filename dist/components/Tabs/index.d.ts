import { TabsProps } from "./tabs";
import { TabItemProps } from "./tabitem";
import { FC } from "react";
export declare type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
