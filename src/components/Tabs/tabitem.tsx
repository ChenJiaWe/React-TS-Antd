import React, { useContext, FC, CSSProperties } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";

export interface TabItemProps {
    label: string;
    disabled?: boolean;
    index?: number;
    className?: string;
    style?: CSSProperties;
};


export const TabItem: FC<TabItemProps> = (props) => {
    const { disabled, index,
        className, style, children } = props;
    const context = useContext(TabsContext);
    const classes = classNames("tab-content", className, {
        "tab-content-active": context.index === index,
        "tab-content-disabled": disabled
    });
    return (
        <li className={classes} style={style}>
            {children}
        </li>
    )
};

TabItem.displayName = "TabItem";

export default TabItem;