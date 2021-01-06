import React, { useState, useContext,MouseEvent,Children,
     FunctionComponentElement ,FC,cloneElement} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";


export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
};


export const SubMenu: FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpend = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpend);
    const classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical"
    });

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };

    let timer: any;
    const handleMouse = (e: MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    const clickEvent = context.mode === "vertical" ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== "vertical" ? {
        onMouseEnter: (e: MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: MouseEvent) => { handleMouse(e, false) }
    } : {};
    const renderChildren = () => {
        const subMenuClasses = classNames("chenlegion-submenu", {
            "menu-opened": menuOpen
        });
        const childrenComponent = Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === "MenuItem") {
                return cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error("Warning:SubMenu has a child which is not a MenItem");
            };
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
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >

                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvent}>
                {title}
                <Icon icon="chevron-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
};

SubMenu.displayName = "SubMenu";

export default SubMenu;

