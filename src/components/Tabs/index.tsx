import Tabs, { TabsProps } from "./tabs";
import TabItem, { TabItemProps } from "./tabitem";
import { FC } from "react";


export type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};


const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;