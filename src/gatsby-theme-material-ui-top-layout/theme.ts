import { createMuiTheme } from "@material-ui/core";

// A custom theme for this app basically a copy of the default dark theme
// https://material-ui.com/customization/default-theme/
// For an example of overriding default componenets styling check out the following article
// https://www.headway.io/blog/global-styling-with-material-ui-theme-overrides-and-props

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export default theme;
