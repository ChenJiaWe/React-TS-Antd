import React, { FC } from "react";
import { ThemProps } from "../Icon/icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
