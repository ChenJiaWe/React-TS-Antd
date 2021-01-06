import React from "react";
import { config } from "react-transition-group";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import AutoComplete, { AutoCompleteProps, DataSourceType } from "./autoComplete";


//将异步行为看做同步行为
config.disabled = true;

const testArray = [
    { value: "ab", number: 11 },
    { value: "abc", number: 1 },
    { value: "b", number: 4 },
    { value: "c", number: 15 }
];

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => {
        return testArray.filter(
            item => item.value.includes(query))
    },
    onSelect: jest.fn(),
    placeholder: "auto-complete"
};


interface LakerPlayerProps {
    value: string;
    number: number;
};

const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
];
const renderOption = (item: DataSourceType) => {
    const itemD = item as DataSourceType<LakerPlayerProps>;
    return (
        <div>
            <h2>Name:{itemD.value}</h2>
            <p>{itemD.number}</p>
        </div>
    )
};
const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query));
};

const testPropsWithRenderOption: AutoCompleteProps = {
    renderOption: renderOption,
    fetchSuggestions: handleFetch,
    onSelect: jest.fn(),
    placeholder: "auto-complete"
};


const testPropsWithFetchSuggestions = {
    fetchSuggestions: jest.fn(),
    placeholder: "auto-complete"
}

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps}></AutoComplete>);
        inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;

    });
    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        // should have two suggestion items
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
        //click the first item
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith('ab')
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
        //fill the input
        expect(inputNode.value).toBe('ab')
    })
    it('should provide keyboard support', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        const firstResult = wrapper.queryByText('ab')
        const secondResult = wrapper.queryByText('abc')

        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(firstResult).toHaveClass('item-highlighted')
        //arrow down 
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(secondResult).toHaveClass('item-highlighted')
        //arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 })
        expect(firstResult).toHaveClass('item-highlighted')
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith('ab')
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })

    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        fireEvent.click(document);
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    })
    it('renderOption should generate the right template', async () => {
        cleanup();
        const wrapper = render(<AutoComplete {...testPropsWithRenderOption}></AutoComplete>);
        const inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
        fireEvent.change(inputNode, { target: { value: "a" } });
        await waitFor(() => {
            expect(wrapper.getByText("Name:james")).toBeInTheDocument();
        });
    })
    it('async fetchSuggestions should works fine', async () => {
        cleanup();
        const wrapper = render(<AutoComplete {...testPropsWithFetchSuggestions}></AutoComplete>);
        const inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
        fireEvent.change(inputNode, { target: { value: "a" } });
        await waitFor(() => {
           setTimeout(()=>{
            expect(testPropsWithFetchSuggestions.fetchSuggestions).toHaveBeenCalled();
           })
        });
    })
});
