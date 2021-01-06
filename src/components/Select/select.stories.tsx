import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select, { SelectProps } from "./select";
import Option from "./option";
import { withInfo } from "@storybook/addon-info";

export default {
    title: "SelectComponent",
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true
        }
    }
}


export const SelectComponent: Story<SelectProps> = () => (
    <div>
        <Select
            multiple
            onChange={(value, values) => { console.log(values) }}
            // onVisbleChange={(visable) => console.log(visable)}
            placeholder="请选择" style={{ width: "420px" }}>
            <Option disabled value={"nihao"}></Option>
            <Option value={"nihao"}></Option>
            <Option value={"nihao"}></Option>
            <Option value={"nihao"}></Option>
        </Select>
        <hr />
        <Select

            onChange={(value, values) => { action("change") }}
            onVisbleChange={(visable) => action("onVisbleChange")}
            placeholder="请选择" style={{ width: "420px" }}>
            <Option value={"nihao1"}></Option>
            <Option value={"nihao2"}></Option>
            <Option value={"nihao3"}></Option>
            <Option value={"nihao4"}></Option>
        </Select>
    </div>
);


SelectComponent.storyName = "SelectComponent";