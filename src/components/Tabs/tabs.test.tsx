import React from "react";
import { fireEvent, render, RenderResult, cleanup } from "@testing-library/react";


import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabitem";

const testProps: TabsProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: "test"
};

const testVerProps: TabsProps = {
    defaultIndex: 0,
    mode: "vertical"
};

const generateTabs = (props: TabsProps) => {
    return (
        <Tabs {...props}>
            <TabItem label="card1" >
                this is card one
        </TabItem>
            <TabItem label="card2">
                this is card two
        </TabItem>
            <TabItem label="disabled" disabled>
                this is content
        </TabItem>
        </Tabs>
    )
}




let wrapper: RenderResult, activedLabelElement: HTMLElement,
    TabsElement: HTMLElement, disabledLabelElement: HTMLElement,
    activedContentElement: HTMLElement, disabledContentElement: HTMLElement;


describe("test Tabs and TabItem", () => {
    beforeEach(() => {
        wrapper = render(generateTabs(testProps));

        TabsElement = wrapper.getByTestId("test-tabs");

        activedLabelElement = wrapper.getByText("card1");
        activedContentElement = wrapper.getByText("this is card one");

        disabledLabelElement = wrapper.getByText("disabled");
        disabledContentElement = wrapper.getByText("this is content");
    });

    it("should render correct Tabs and TabItem base on defalut Props", () => {
        expect(TabsElement).toBeInTheDocument();

        expect(activedLabelElement).toHaveClass("tab-label-active");
        expect(activedContentElement).toHaveClass("tab-content-active");

        expect(disabledLabelElement).toHaveClass("tab-label-disabled");
        expect(disabledContentElement).toHaveClass("tab-content-disabled");
    });

    it("click item should change active and call the right callback", () => {
        const twoLabel = wrapper.getByText("card2");
        const twoContent = wrapper.getByText("this is card two");
        expect(twoLabel).toBeInTheDocument();
        fireEvent.click(twoLabel);
        expect(twoLabel).toHaveClass("tab-label-active");
        expect(twoContent).toHaveClass("tab-content-active");
        fireEvent.click(disabledLabelElement);
        expect(disabledLabelElement).not.toHaveClass("tab-label-active");
        expect(activedContentElement).not.toHaveClass("tab-content-active");
    });
    it("should render vertical mode when mode is set to vertical", () => {
        cleanup();
        const wrapper = render(generateTabs(testVerProps));
        const TabsElement = wrapper.getByTestId("test-tabs");
        expect(TabsElement).toBeInTheDocument();
        expect(TabsElement).toHaveClass("tabs-vertical");
    });

})