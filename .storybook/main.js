// import {}from "../src/components/Button/button.stories"
module.exports = {
  "stories": [
    "../src/welcome.stories.tsx",
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-docs/preset',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
}