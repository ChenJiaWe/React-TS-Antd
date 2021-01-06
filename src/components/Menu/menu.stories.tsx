import React from "react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { Meta, Story } from "@storybook/react/types-6-0";
import Menu, { MenuProps } from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";


export default {
    title: "Menu Compoent",
    compoent: Menu,
    decorators: [withInfo],
    parameters: {
        info: {
            inline: true,
        }
    }
} as Meta;

export const defalutMenu: Story<MenuProps> = () => (
    <div>
        {/* defalut Menu */}
        <h2>defalut Menu</h2>
        <Menu defaultIndex="0" onSelect={action("selected")} >
            <MenuItem >
                cool link
  </MenuItem >
            <MenuItem >
                cool link 2
  </MenuItem>
            <MenuItem >
                cool link 3
  </MenuItem >
        </Menu>
        <hr />
        {/* MenuItem disabled */}
        <h2>MenuItem disabled</h2>
        <Menu defaultIndex="0" >
            <MenuItem >
                cool link
  </MenuItem >
            <MenuItem disabled>
                cool link 2
  </MenuItem>
            <MenuItem >
                cool link 3
  </MenuItem >
        </Menu>
        <hr />
        {/* Menu and SubMenu */}
        <h2>Menu and SubMenu</h2>
        <Menu defaultIndex="0" >
            <MenuItem >
                cool link
  </MenuItem >
            <MenuItem disabled>
                cool link 2
  </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    dropdown 1
        </MenuItem>
                <MenuItem>
                    dropdown 2
        </MenuItem>
            </SubMenu>
            <MenuItem >
                cool link 3
  </MenuItem >
        </Menu>
        <hr />
        {/* vertical Menu  */}
        <h2>vertical Menu </h2>
        <Menu defaultIndex="0" defaultOpenSubMenus={["2"]} mode="vertical">
            <MenuItem >
                cool link
  </MenuItem >
            <MenuItem disabled>
                cool link 2
  </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    dropdown 1
        </MenuItem>
                <MenuItem>
                    dropdown 2
        </MenuItem>
            </SubMenu>
            <MenuItem >
                cool link 3
  </MenuItem >
        </Menu>
    </div>
);
defalutMenu.storyName = "Menu";
