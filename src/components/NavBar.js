import { AppBar, Badge, Button, IconButton, Toolbar } from "@material-ui/core";
import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
// import { Home } from "@material-ui/icons";

function NavBar() {
  return (
    <AppBar color="default" position="fixed">
      <Toolbar>
        <IconButton>
          <HomeIcon color="primary" fontSize="large"/>
        </IconButton>
        <div style={{ flex: "1" }}></div>
        <div className="navbar-actions">
          <IconButton>
            <Badge badgeContent={3} style={{color:"black", fontWeight: "bolder"}}>
              <NotificationsIcon color="primary" />
            </Badge>
          </IconButton>
          <Button text="login" variant="contained" component={Link} to="/login" >
            Log in
          </Button>
          <Button text="sign up" component={Link} to="/signup">
            Sign up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
