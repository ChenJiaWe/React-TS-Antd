import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent,  render, RenderResult, waitFor } from "@testing-library/react";
import axios from "axios";
import Upload, { UploadProps } from "./upload";
import { IconProps } from "../Icon/icon";

jest.mock("../Icon/icon", () => {
    return ({ icon, onClick }: IconProps) => {
        return <svg onClick={onClick}>{icon}</svg>
    }
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const testProps: UploadProps = {
    action: "fakeurl.com",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement,
    uploadArea: HTMLElement;

const testFile = new File(["xyz"], "test.png", {
    type: "image/png"
});


describe("test upload component", () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector(".chenlegion-file-input") as HTMLInputElement;
        uploadArea = wrapper.queryByText("Click to upload") as HTMLElement;
    });
    it("upload process should works fine", async () => {
        const { queryByText } = wrapper;
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ "data": "cool" });
        // });
        mockedAxios.post.mockResolvedValue({ "data": "cool" });
        expect(uploadArea).toBeInTheDocument();
        expect(fileInput).not.toBeVisible();
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        expect(queryByText("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByText("test.png")).toBeInTheDocument();
        });
        expect(queryByText("check-circle")).toBeInTheDocument();
        expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
        expect(testProps.onChange).toHaveBeenLastCalledWith(testFile);

        //remove the uploaded file
        expect(queryByText("times")).toBeInTheDocument();
        fireEvent.click(queryByText("times") as HTMLElement);
        expect(queryByText("text.png")).not.toBeInTheDocument();

        //测试是否包含某些特定的值
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining(
            {
                raw: testFile,
                status: "success",
                name: "test.png"
            }
        ));
    });
    it("drag and drop files should works fine", async () => {
         const { queryByText } = wrapper;
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('is-dragover');
        mockedAxios.post.mockResolvedValue({ "data": "cool" });
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass("is-dragover");
        fireEvent.drop(uploadArea, {
            dataTransfer: { files: [testFile] }
        });
        await waitFor(() => {
            expect(queryByText("test.png")).toBeInTheDocument();
        });
        expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    });
});