var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext, Children, cloneElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
;
export var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpend = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false;
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical"
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvent = context.mode === "vertical" ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== "vertical" ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames("chenlegion-submenu", {
            "menu-opened": menuOpen
        });
        var childrenComponent = Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error("Warning:SubMenu has a child which is not a MenItem");
            }
            ;
        });
        return (
        // <CSSTransition
        //     in={menuOpen}
        //     timeout={300}
        //     classNames="zoom-in-top"
        //     //一开时就运行动画效果
        //     appear
        //     //动态添加和卸载ul
        //     unmountOnExit
        // >
        //     <ul className={subMenuClasses}>
        //         {childrenComponent}
        //     </ul>
        // </CSSTransition>
        React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvent),
            title,
            React.createElement(Icon, { icon: "chevron-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
