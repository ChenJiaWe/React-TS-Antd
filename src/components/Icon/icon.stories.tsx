import React from "react";
import { withInfo } from "@storybook/addon-info";
import { Meta, Story } from "@storybook/react/types-6-0";
import Icon, { IconProps } from "./icon";

export default {
    title: "Icon Component",
    component: Icon,
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true
        }
    }
} as Meta;

export const defaultIcon: Story<IconProps> = () => (
    <Icon icon="arrow-down"></Icon>
)

defaultIcon.storyName="Icon";