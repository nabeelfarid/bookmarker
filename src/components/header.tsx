import React from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Tooltip,
} from "@material-ui/core";
import { GitHub, Home } from "@material-ui/icons";
import { IconButton as GatsbyIconButton } from "gatsby-material-ui-components";

interface HeaderProps {
  siteTitle: string;
  repo: string;
  pathname: string;
}
const Header: React.FC<HeaderProps> = (props) => {
  console.log("path", props.pathname);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h4"
          component={GatsbyLink}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {props.siteTitle}
        </Typography>
        <Box flexGrow={1} />

        {props.pathname && (
          <Tooltip title="Home">
            <GatsbyIconButton aria-label="admin" color="inherit" to="/">
              <Home />
            </GatsbyIconButton>
          </Tooltip>
        )}
        <Tooltip title="Github Repo">
          <IconButton
            color="inherit"
            aria-label="github"
            href={props.repo}
            target="blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
