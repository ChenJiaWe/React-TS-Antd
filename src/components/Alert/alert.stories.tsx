import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Alert, { AlertProps } from "./alert";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";


export default {
    title: "Alert Component",
    component: Alert,
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true
        }
    }
} as Meta;


export const defaultAlert: Story<AlertProps> = () => (
    <Alert style={{width:"500px"}} onClick={action("clicked")} title="default Alert"></Alert>
);

defaultAlert.storyName = "Alert";

export const AlertwithType: Story<AlertProps> = () => (
    <div style={{width:"500px"}}>
        <Alert type="danger" title="danger Alert"></Alert>
        <Alert type="success" title="success Alert"></Alert>
        <Alert type="warning" title="warning Alert"></Alert>
    </div>
);

AlertwithType.storyName = "不同类型的Alert";

export const AlertwithContent: Story<AlertProps> = () => (
    <div style={{width:"500px"}}> 
        <Alert title="danger Alert" message="content"></Alert>
    </div>
);

AlertwithContent.storyName = "带有内容的Alert";