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
import { GitHub } from "@material-ui/icons";

interface HeaderProps {
  siteTitle: string;
  repo: string;
}
const Header: React.FC<HeaderProps> = (props) => {
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
