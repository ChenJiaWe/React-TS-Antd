import React from "react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { Meta, Story } from "@storybook/react/types-6-0";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabitem";

export default {
    title: "Tabs Component",
    component: Tabs,
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true,
        }
    }
} as Meta;

export const defaultTabs: Story<TabsProps> = () => (
    <div>
        <h2>horizontal</h2>
        <Tabs defaultIndex={0} mode="horizontal" onSelect={action("selected")}>
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
        <hr />
        <h2>vertical</h2>
        <Tabs defaultIndex={0} mode="vertical" onSelect={action("selected")}>
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
    </div>
);

defaultTabs.storyName = "Tabs";