import React, {
    useState, CSSProperties, FunctionComponentElement,
    createContext, ReactNode, Children, cloneElement, FC
} from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabitem";
type TabsMode = "horizontal" | "vertical";



export interface TabsProps {
    defaultIndex: number;
    onSelect?: (selectIndex: number) => void;
    className?: string;
    style?: CSSProperties;
    mode?: TabsMode;
};

interface iTabsContext {
    index: number;
    // onSelect?: (selectIndex: number) => void;
    mode?: TabsMode
}

export const TabsContext = createContext<iTabsContext>({ index: 0 });

const renderLable = (children: ReactNode,
    currentIndex: number, handledClick: (index: number, disabled: boolean) => void) => {
    return Children.map(children, (child, index) => {
        const childElement = child as FunctionComponentElement<TabItemProps>;
        const { displayName } = childElement.type;
        const { disabled = false, className } = childElement.props;
        const classes = classNames("tab-label", className, {
            "tab-label-disabled": disabled,
            "tab-label-active": currentIndex === index
        })

        if (displayName === "TabItem") {
            return <li className={classes} onClick={() => handledClick(index, disabled)}>{childElement.props.label}</li>
        } else {
            console.error("Warning:Menu has a child which is not a TabItem");
        }
    })
}
const renderContent = (children: ReactNode) => {
    return Children.map(children, (child, index) => {
        const childElement = child as FunctionComponentElement<TabItemProps>;
        const { displayName } = childElement.type;
        if (displayName === "TabItem") {
            return cloneElement(childElement, {
                index
            });
        } else {
            console.error("Warning:Menu has a child which is not a TabItem");
        }
    })
}
/**
 *## 导入方式
 * ~~~js
 * import Tab from "chenlegion"
 * import TabItem from "chenlegion"
 * ~~~
 */
export const Tabs: FC<TabsProps> = (props) => {
    const { defaultIndex, onSelect, className,
        children, mode } = props;
    const classes = classNames("chenlegion-tabs", className, {
        "tabs-vertical": mode === "vertical"
    });

    const [currentIndex, setCurrent] = useState(defaultIndex);

    const handledClick = (index: number, disabled = false) => {
        if (!disabled) {
            setCurrent(index);
        };
        if (onSelect) {
            onSelect(index);
        };
    };

    const passContext: iTabsContext = {
        index: currentIndex ? currentIndex : 0,
        // onSelect: handledClick
    }

    return (
        <div className={classes} data-testid="test-tabs">
            <TabsContext.Provider value={passContext}
            >
                <ul className="tab-labels">{renderLable(children, currentIndex, handledClick)}</ul>
                <ul className="tab-contents">{renderContent(children)}</ul>
            </TabsContext.Provider>
        </div>
    )
}

Tabs.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal"
};


export default Tabs;