import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { selectContext } from "./select";
import Icon from "../Icon/icon";
;
export var Option = function (porps) {
    var index = porps.index, value = porps.value, disabled = porps.disabled;
    var context = useContext(selectContext);
    var _a = useState(false), optionSelected = _a[0], setSelected = _a[1];
    var cnames = classNames("select-option", {
        "option-actived": optionSelected,
        "option-disabled": disabled,
    });
    useEffect(function () {
        var selectedValues = context.selectedValues || [];
        var multiple = context.multiple;
        var optionsisActived = context.optionsisActived || [];
        if (multiple && selectedValues.length && index) {
            if (!selectedValues.includes(value)) {
                setSelected(false);
            }
            selectedValues.forEach(function (v, i) {
                var _a;
                if (v === value && ((_a = context.optionsRef) === null || _a === void 0 ? void 0 : _a.current[i]) !== index && !optionsisActived[index]) {
                    setSelected(false);
                }
            });
            selectedValues.forEach(function (v, i) {
                var _a;
                if (v === value && ((_a = context.optionsRef) === null || _a === void 0 ? void 0 : _a.current[i]) === index && optionsisActived[index]) {
                    setSelected(true);
                }
            });
        }
    }, [context.multiple, context.selectedValues, value,
        context.optionsisActived, index, context.optionsRef]);
    var handleOptionClick = function () {
        var _a;
        if (disabled) {
            return;
        }
        var selectedValues = context.selectedValues || [];
        var multiple = context.multiple;
        var optionsisActived = context.optionsisActived || [];
        if (multiple) {
            if (!selectedValues.includes(value) || (selectedValues.includes(value)
                && index && !optionsisActived[index])) {
                selectedValues.push(value);
                if (context.optionsRef && index) {
                    var i = selectedValues.length - 1;
                    context.optionsRef.current[i] = index;
                }
                if (index && context.ChangeOptionsActived) {
                    context.ChangeOptionsActived(optionsisActived, index);
                }
                ;
                setSelected(true);
                if (context.SelectedOption) {
                    context.SelectedOption(value, selectedValues);
                }
            }
            else {
                selectedValues.splice(selectedValues.indexOf(value), 1);
                (_a = context.optionsRef) === null || _a === void 0 ? void 0 : _a.current.splice(selectedValues.indexOf(value), 1);
                setSelected(false);
                if (index && context.ChangeOptionsActived) {
                    context.ChangeOptionsActived(optionsisActived, index);
                }
                ;
                if (context.SelectedOption) {
                    context.SelectedOption(value, selectedValues);
                }
            }
        }
        else {
            if (selectedValues.length) {
                selectedValues.pop();
            }
            ;
            selectedValues.push(value);
            if (context.SelectedOption) {
                context.SelectedOption(value, selectedValues);
            }
        }
    };
    return (React.createElement("li", { className: cnames, onClick: handleOptionClick, key: index },
        value,
        optionSelected && React.createElement(Icon, { theme: "primary", icon: "check" })));
};
export default Option;
