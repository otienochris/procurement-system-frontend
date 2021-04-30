import { AppBar, Badge, Button, IconButton, Toolbar } from "@material-ui/core";
import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
// import { Home } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInActions, tokenActions } from "../actions";

function NavBar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(isLoggedInActions("SIGN_OUT"));
    dispatch(tokenActions("CLEAR_TOKEN"));
  };
  return (
    <AppBar color="default" position="fixed">
      <Toolbar>
        <IconButton component={Link} to="/">
          <HomeIcon color="primary" fontSize="large" />
        </IconButton>
        <div style={{ flex: "1" }}></div>
        <div className="navbar-actions">
          {isLoggedIn && (
            <IconButton>
              <Badge
                badgeContent={3}
                style={{ color: "black", fontWeight: "bolder" }}
              >
                <NotificationsIcon color="primary" />
              </Badge>
            </IconButton>
          )}
          {!isLoggedIn && (
            <>
              <Button variant="contained" component={Link} to="/login">
                Log in
              </Button>
              <Button component={Link} to="/signup">
                Sign up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button component={Link} to="/" onClick={handleLogOut}>
              log out
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
