import React from "react";
import { fireEvent, render, } from "@testing-library/react";
import Alert from "./alert";

describe("test Component Alert", () => {
    it("render defalut Alert", () => {
        const wrapper = render(<Alert title="Defalut"></Alert>);
        const element = wrapper.getByText("Defalut");
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("alert-tittle");
    });
    it("render Alert with message ", () => {
        const wrapper = render(<Alert title="Defalut" message="messsage"></Alert>);
        const element = wrapper.getByText("messsage");
        expect(element).toBeInTheDocument();
    });
    // it("render Alert whith event ", () => {
    //     const defalutClick = jest.fn().mockName("my dope mock");;
    //     const wrapper = render(<Alert type="danger" title="Defalut" message="messsage"></Alert>);
    //     const element = wrapper.getByTestId("test-alertClosed");
    //     expect(element).toHaveClass("alert-closeIcon");
    //     fireEvent.click(element);
    //     expect(defalutClick).toHaveBeenCalled();
    // })
});
