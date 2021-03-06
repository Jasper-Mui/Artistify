import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Box } from "@material-ui/core";
import VideoSearch from "./VideoSearch/VideoSearch";
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// import UserSection from "./UserSection/UserSection";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function PrimarySearchAppBar({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  searchTerm,
  queue,
  darkMode,
  setDarkMode,
  isLoading,
}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar color="transparent">
        <Toolbar>
          {/* Icon-logo */}
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Qasong logo"
            >
              <img
                src=".\img\whiteLogo.png"
                height="36px"
                width="36px"
                style={{ filter: `invert(${darkMode ? "0" : "1"})` }}
              />
            </IconButton>
          </Link>

          {/* Search bar */}
          <VideoSearch
            handleSearchTermInput={handleSearchTermInput}
            handleSubmitVideoSearch={handleSubmitVideoSearch}
            searchTerm={searchTerm}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
          />

          {/* Search Bar Loading Indicator */}
          <Box mx={2}> {isLoading && <LoadingAnimation size="32px" />} </Box>

          {/* responsive spacer */}
          <div className={classes.grow} />

          {/* Menus */}
          <DesktopMenu {...{ queue, darkMode, setDarkMode }} />
          <MobileMenu {...{ queue, darkMode, setDarkMode }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
