import React from "react";
import {
    cleanup, fireEvent, render,
    RenderResult
} from "@testing-library/react";
import Select, { SelectProps } from "./select";
import Option from "./option";


const testProps: SelectProps = {
    onChange: jest.fn(),
    placeholder: "hello",

    onVisbleChange: jest.fn(),
}


const testPropsWithMultiple: SelectProps = {
    multiple: true
}


const renderSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
        >
            <Option disabled value={"nihao1"}></Option>
            <Option value={"nihao2"}></Option>
            <Option value={"nihao3"}></Option>
            <Option value={"nihao4"}></Option>
        </Select>
    )
};


const createStyle = () => {
    const cssFile = `
        .select-ul{
            display:block
        }
        .test-selected-ul{
            display:none
        }
    `;
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssFile;
    return style;
}


let wrapper: RenderResult, InputCompoent: HTMLElement;


describe("test Select Component", () => {
    beforeEach(() => {
        wrapper = render(renderSelect(testProps));
        wrapper.container.append(createStyle());
        InputCompoent = wrapper.getByTestId("input-component") as HTMLElement;
    })
    it("rest default Select Component ", () => {
        fireEvent.click(InputCompoent);
        expect(wrapper.container
            .querySelectorAll(".select-option").length).toEqual(4);

        expect(testProps.onVisbleChange).toHaveBeenCalled();

        //获取第一个元素
        const text1 = wrapper.getByText("nihao1");
        expect(text1).toBeInTheDocument();
        fireEvent.click(text1);
        expect(wrapper.container
            .querySelectorAll(".select-option").length).toEqual(4);
        expect(testProps.onChange).not.toHaveBeenCalled();
        //获取第二个元素
        const text2 = wrapper.getByText("nihao2");
        expect(text2).toBeInTheDocument();
        fireEvent.click(text2);
        expect(testProps.onChange).toHaveBeenCalled();
    });

    it("test Select Component with multiple", () => {
        cleanup();
        const wrapper = render(renderSelect(testPropsWithMultiple));
        const InputCompoent = wrapper.getByTestId("input-component") as HTMLElement;
        //由于代码原因，本身存在一个
        expect(wrapper.container
            .querySelectorAll(".option-selected").length).toEqual(1);
        fireEvent.click(InputCompoent);
        const text1 = wrapper.getByText("nihao1");
        expect(text1).toBeInTheDocument();
        fireEvent.click(text1);
        //由于代码原因，本身存在一个
        expect(wrapper.container
            .querySelectorAll(".option-selected").length).toEqual(1);
        expect(text1).not.toHaveClass(".option-actived");

        const text3 = wrapper.getByText("nihao3");
        expect(text3).toBeInTheDocument();
        fireEvent.click(text3);
        expect(wrapper.container
            .querySelectorAll(".option-selected").length).toEqual(2);
        expect(text3).toHaveClass("select-option option-actived");

        //点击取消
        const cancelText3 = wrapper.getByTestId("select-Icon-1");
        expect(cancelText3).toBeInTheDocument();
        fireEvent.click(cancelText3);
        expect(wrapper.container
            .querySelectorAll(".option-selected").length).toEqual(1);
        expect(text3).not.toHaveClass("select-option option-actived");
    });
});