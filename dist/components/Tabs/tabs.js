import React, { useState, createContext, Children, cloneElement } from "react";
import classNames from "classnames";
;
export var TabsContext = createContext({ index: 0 });
var renderLable = function (children, currentIndex, handledClick) {
    return Children.map(children, function (child, index) {
        var childElement = child;
        var displayName = childElement.type.displayName;
        var _a = childElement.props, _b = _a.disabled, disabled = _b === void 0 ? false : _b, className = _a.className;
        var classes = classNames("tab-label", className, {
            "tab-label-disabled": disabled,
            "tab-label-active": currentIndex === index
        });
        if (displayName === "TabItem") {
            return React.createElement("li", { className: classes, onClick: function () { return handledClick(index, disabled); } }, childElement.props.label);
        }
        else {
            console.error("Warning:Menu has a child which is not a TabItem");
        }
    });
};
var renderContent = function (children) {
    return Children.map(children, function (child, index) {
        var childElement = child;
        var displayName = childElement.type.displayName;
        if (displayName === "TabItem") {
            return cloneElement(childElement, {
                index: index
            });
        }
        else {
            console.error("Warning:Menu has a child which is not a TabItem");
        }
    });
};
/**
 *## 导入方式
 * ~~~js
 * import Tab from "chenlegion"
 * import TabItem from "chenlegion"
 * ~~~
 */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, onSelect = props.onSelect, className = props.className, children = props.children, mode = props.mode;
    var classes = classNames("chenlegion-tabs", className, {
        "tabs-vertical": mode === "vertical"
    });
    var _a = useState(defaultIndex), currentIndex = _a[0], setCurrent = _a[1];
    var handledClick = function (index, disabled) {
        if (disabled === void 0) { disabled = false; }
        if (!disabled) {
            setCurrent(index);
        }
        ;
        if (onSelect) {
            onSelect(index);
        }
        ;
    };
    var passContext = {
        index: currentIndex ? currentIndex : 0,
    };
    return (React.createElement("div", { className: classes, "data-testid": "test-tabs" },
        React.createElement(TabsContext.Provider, { value: passContext },
            React.createElement("ul", { className: "tab-labels" }, renderLable(children, currentIndex, handledClick)),
            React.createElement("ul", { className: "tab-contents" }, renderContent(children)))));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal"
};
export default Tabs;
