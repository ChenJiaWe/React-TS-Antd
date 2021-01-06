import React from "react";
import { storiesOf,  } from "@storybook/react";

import { addons } from '@storybook/addons';

storiesOf("Welcom page", module)
    .add("welcome", () => {
        return (
            <div>
                <h1>欢迎来到chenlegion组件库</h1>
                <p>自己学习使用的</p>
                <code>npm install chenlegion --save</code>
            </div>
        )
    }, { info: { disable: true } });
    addons.setConfig({
        showRoots: true,
      });


