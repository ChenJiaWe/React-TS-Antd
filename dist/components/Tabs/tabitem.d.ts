import { FC, CSSProperties } from "react";
export interface TabItemProps {
    label: string;
    disabled?: boolean;
    index?: number;
    className?: string;
    style?: CSSProperties;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
