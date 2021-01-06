import React, { FC } from "react";
import { ThemProps } from "../Icon/icon";

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemProps;
};


const Progress: FC<ProgressProps> = (props) => {
    const {
        percent, strokeHeight,
        showText, styles, theme
    } = props;

    return (
        <div className="chenlegion-progress-bar" style={styles}>
            <div className="chenlegion-progress-bar-outer"
                style={{ height: `${strokeHeight}px` }}
            >
                <div
                    className={`chenlegion-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
};

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};

export default Progress;
