import React, {
    useState, createContext, FC, cloneElement,
    CSSProperties, FunctionComponentElement, Children
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
};

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });
/**
 *## 导入方式
 * ~~~js
 * import Menu from "chenlegion"
 * import MenuItem from "chenlegion"
 * import SubMenu from "chenlegion"
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode,
        style, children, onSelect, defaultOpenSubMenus } = props;
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames("chenlegion-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical"
    });
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        };
    };
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus

    };

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return cloneElement(childElement, {
                    index: index + ""
                });
            } else {
                console.error("Warning:Menu has a child which is not a MenItem");
            };
        });
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: []
};

export default Menu;

