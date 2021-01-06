import React, { useState } from "react";
import { withInfo } from "@storybook/addon-info";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import Input, { InputProps } from "./input";


export default {
    title: "Input Component",
    component: Input,
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true
        }
    }
} as Meta;

const ControlledInput = () => {
    const [value, setValue] = useState("");
    return <Input value={value}
        defaultValue={value} onChange={(e) => { setValue(e.target.value) }}></Input>
};

export const defaultInput: Story<InputProps> = () => (
    <div>
        <Input style={{ width: "300px" }}
            placeholder="placeholder"
            onChange={action("changed")}
        ></Input>
        <ControlledInput></ControlledInput>
    </div>
);
defaultInput.storyName = "Input";

export const disabledInput: Story<InputProps> = () => (
    <Input style={{ width: "300px" }}
        placeholder="disabled placeholder"
        disabled></Input>
);

disabledInput.storyName = "被禁用的 Input";

export const iconInput: Story<InputProps> = () => (
    <Input style={{ width: "300px" }}
        placeholder="input with icon"
        icon="search"></Input>
);

export const sizeInput: Story<InputProps> = () => (
    <div>
        <Input
            style={{ width: '300px' }}
            defaultValue="large size"
            size="lg"
        />
        <Input
            style={{ width: '300px' }}
            placeholder="small size"
            size="sm"
        />
    </div>
)

sizeInput.storyName = "大小不同的 Input";

export const pandInput: Story<InputProps> = () => (
    <div>
        <Input
            style={{ width: '300px' }}
            defaultValue="prepend text"
            prepend="https://"
        />
        <Input
            style={{ width: '300px' }}
            defaultValue="google"
            append=".com"
        />
    </div>
)

pandInput.storyName = "带前后缀的 Input";