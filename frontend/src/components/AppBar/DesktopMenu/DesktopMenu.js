import React from "react";
import { Tooltip, Box, IconButton, Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function DesktopMenu({ queue, darkMode, setDarkMode }) {
  let history = useHistory();

  const classes = useStyles();

  return (
    <div className={classes.sectionDesktop} id="desktop-menu">
      <Tooltip
        title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}
      >
        <Box>
          <IconButton
            edge="end"
            title={"songs currently in the queue"}
            color={"inherit"}
            target="_blank"
            onClick={() => {
              history.push("/queue");
            }}
          >
            <Box mb={1}>
              <Typography>queue</Typography>
            </Box>
            <Badge badgeContent={queue.length} color="secondary">
              <QueueMusicIcon style={{ fontSize: "40px" }} />
            </Badge>
          </IconButton>
        </Box>
      </Tooltip>

      <IconButton
        edge="end"
        title="toggle light/dark theme"
        onClick={() => setDarkMode(!darkMode)}
        target="_blank"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

export default DesktopMenu;
