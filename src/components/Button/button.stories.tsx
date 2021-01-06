import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import Button, { ButtonProps } from "./button";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";




export default {
    title: "Button Component",
    component: Button,
    decorators: [withInfo],
    parameters: {
        info: {
            // text: `
            // this is very nice component
            // ## this is a header
            // ~~~js
            // const a = "hello"
            // ~~~
            // `,
            inline: true,
        }
    }
} as Meta;




export const defaultButton: Story<ButtonProps> = () => (
    <Button onClick={action("clicked")}>default Button</Button>);

defaultButton.storyName = "Button";

export const buttonWithSize: Story<ButtonProps> = () => (
    <div>
        <Button size="lg">large button</Button>
        <Button size="sm">small button</Button>
    </div>
)
buttonWithSize.storyName = "不同尺寸的Button";
// buttonWithSize.parameters = {
//     info: { inline: false }
// };
export const buttonWithType: Story<ButtonProps> = () => (
    <div>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="https://google.com">link button</Button>
    </div>
)
buttonWithType.storyName = "不同类型的Button";