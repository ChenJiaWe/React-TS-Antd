var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef } from "react";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
;
;
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var loadingDataRef = useRef(false);
    var debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            loadingDataRef.current = true;
            if (results instanceof Promise) {
                console.log("triggered");
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
            loadingDataRef.current = false;
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var highlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        ;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        ;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            //回车键
            case 13:
                if (suggestions[highlightIndex]) {
                    handelSelect(suggestions[highlightIndex]);
                }
                ;
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
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handelSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item.value);
        }
        ;
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { animation: "zoom-in-top", timeout: 600, in: loadingDataRef.current, onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: loading ? "suggestions-loading" : "suggestion-ul" }, loading ? (React.createElement(Icon, { className: "suggestions-loading-item", icon: "spinner", spin: true })) :
                suggestions.map(function (item, index) {
                    var cnames = classNames("suggestion-item", {
                        "item-highlighted": index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handelSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "chenlegion-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
