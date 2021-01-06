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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { Children, cloneElement, createContext, useRef, useState } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
;
export var selectContext = createContext({});
export var Select = function (props) {
    var defaultValues = props.defaultValues, placeholder = props.placeholder, multiple = props.multiple, disabled = props.disabled, className = props.className, onChange = props.onChange, onVisbleChange = props.onVisbleChange, children = props.children, restProp = __rest(props, ["defaultValues", "placeholder", "multiple", "disabled", "className", "onChange", "onVisbleChange", "children"]);
    if (defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.length) {
        placeholder = "";
    }
    var _a = useState(defaultValues), selectedValues = _a[0], setValues = _a[1];
    var _b = useState(false), switchOp = _b[0], setSwitch = _b[1];
    var _c = useState(placeholder), inputPla = _c[0], setPlaceholder = _c[1];
    var _d = useState([]), optionsisActived = _d[0], setOptionsActived = _d[1];
    var optionsRef = useRef([]);
    var selectRef = useRef(null);
    var cnames = classNames("chenlegion-select", className);
    var handelSelected = function (value, selectedValues) {
        setValues(__spreadArrays(selectedValues));
        if (onChange) {
            onChange(value, selectedValues);
        }
        setPlaceholder("");
        if (!multiple) {
            setSwitch(!switchOp);
        }
    };
    useClickOutside(selectRef, function () {
        if (switchOp) {
            setSwitch(!switchOp);
        }
        ;
    });
    var ChangeOptionsActived = function (optionsisActived, index) {
        if (!optionsisActived) {
            return;
        }
        ;
        optionsisActived[index] = !optionsisActived[index];
        setOptionsActived(optionsisActived);
    };
    var passContext = {
        SelectedOption: handelSelected,
        selectedValues: selectedValues,
        multiple: multiple,
        ChangeOptionsActived: ChangeOptionsActived,
        optionsRef: optionsRef
    };
    var renderChildren = function () {
        var cArr = Children.map(children, function (child, i) {
            var childElement = child;
            if (!optionsisActived[i]) {
                optionsisActived[i] = false;
            }
            return cloneElement(childElement, {
                index: i
            });
        });
        passContext.optionsisActived = optionsisActived;
        return cArr;
    };
    var handelClick = function (switchOp) {
        switchOp = !switchOp;
        setSwitch(switchOp);
        if (onVisbleChange) {
            onVisbleChange(switchOp);
        }
        ;
    };
    return (React.createElement("div", __assign({ className: cnames }, restProp, { ref: selectRef }),
        React.createElement(selectContext.Provider, { value: passContext },
            React.createElement(Input, { onClick: function () { return handelClick(switchOp); }, className: "select-input" + ((!disabled && switchOp) ? " is-actived" : ""), readOnly: true, placeholder: inputPla, icon: "angle-down", disabled: disabled, value: multiple ? "" : (selectedValues ? selectedValues[0] : "") }),
            React.createElement(Transition, { in: !disabled && switchOp, timeout: 300, animation: "zoom-in-top" },
                React.createElement("ul", { className: "select-ul " + (switchOp ? "test-selected-ul" : "") }, renderChildren())),
            multiple && React.createElement("div", { className: "select-options" }, selectedValues && (selectedValues.length > 0) && selectedValues.map(function (child, index) {
                return React.createElement("span", { key: index, className: "option-selected" },
                    child,
                    React.createElement(Icon, { icon: "times", "data-testid": "select-Icon" + "-" + index, onClick: function () {
                            optionsisActived[optionsRef.current[index]] = false;
                            selectedValues.splice(index, 1);
                            optionsRef.current.splice(index, 1);
                            if (selectedValues.length === 0) {
                                setSwitch(!switchOp);
                            }
                            setValues(__spreadArrays(selectedValues));
                            setOptionsActived(optionsisActived);
                            passContext.optionsisActived = optionsisActived;
                        } }));
            })))));
};
Select.defaultProps = {
    defaultValues: [],
};
export default Select;
