import React, { ChangeEvent, FC, ReactElement, useEffect, useState, KeyboardEvent, useRef } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";

interface DataSourceObject {
    value: string;
};

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: string) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
};



export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const loadingDataRef = useRef(false);

    const debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, () => { setSuggestions([]) });
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue);
            loadingDataRef.current = true;
            if (results instanceof Promise) {
                console.log("triggered");
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
            loadingDataRef.current = false;
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    const highlight = (index: number) => {
        if (index < 0) {
            index = 0;
        };
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        };
        setHighlightIndex(index);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            //回车键
            case 13:
                if (suggestions[highlightIndex]) {
                    handelSelect(suggestions[highlightIndex]);
                };
                break;
            //向上键
            case 38:
                highlight(highlightIndex - 1);
                break;
            //向下键
            case 40:
                highlight(highlightIndex + 1);
                break;
            //ESC键
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    const handelSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item.value);
        };
        triggerSearch.current = false;
    };
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };
    const generateDropdown = () => {
        return (
            <Transition
                animation="zoom-in-top"
                timeout={600}
                in={loadingDataRef.current}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className={loading ? "suggestions-loading" : "suggestion-ul"}>
                    {loading ? (<Icon className="suggestions-loading-item" icon="spinner" spin />) :
                        suggestions.map((item, index) => {
                            const cnames = classNames("suggestion-item", {
                                "item-highlighted": index === highlightIndex
                            });
                            return (
                                <li key={index} className={cnames}
                                    onClick={() => handelSelect(item)}
                                >
                                    {renderTemplate(item)}
                                </li>
                            )
                        })}

                </ul>
            </Transition>
        )
    }
    return (
        <div className="chenlegion-auto-complete"
            ref={componentRef}
        >
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { generateDropdown()}
        </div>
    )
};


export default AutoComplete;