import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";
;
export var TabItem = function (props) {
    var disabled = props.disabled, index = props.index, className = props.className, style = props.style, children = props.children;
    var context = useContext(TabsContext);
    var classes = classNames("tab-content", className, {
        "tab-content-active": context.index === index,
        "tab-content-disabled": disabled
    });
    return (React.createElement("li", { className: classes, style: style }, children));
};
TabItem.displayName = "TabItem";
export default TabItem;
