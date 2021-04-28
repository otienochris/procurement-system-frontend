import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    position: "relative",
    bottom: "0px",
    width: "100%",
  },
});

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar></Toolbar>
      </AppBar>
    </footer>
  );
}

export default Footer;
