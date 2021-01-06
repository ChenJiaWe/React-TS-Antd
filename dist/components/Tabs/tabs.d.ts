import React, { CSSProperties, FC } from "react";
declare type TabsMode = "horizontal" | "vertical";
export interface TabsProps {
    defaultIndex: number;
    onSelect?: (selectIndex: number) => void;
    className?: string;
    style?: CSSProperties;
    mode?: TabsMode;
}
interface iTabsContext {
    index: number;
    mode?: TabsMode;
}
export declare const TabsContext: React.Context<iTabsContext>;
/**
 *## 导入方式
 * ~~~js
 * import Tab from "chenlegion"
 * import TabItem from "chenlegion"
 * ~~~
 */
export declare const Tabs: FC<TabsProps>;
export default Tabs;
