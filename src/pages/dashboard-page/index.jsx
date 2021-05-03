import {
  AppBar,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomPaper from "../../components/customControls/CustomPaper";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PeopleIcon from "@material-ui/icons/People";
import Users from "./Users";
import { useStyles } from "../signup-page/";

const useStylesIndex = makeStyles((theme) => ({
  navigationArea: {
    height: "100vh",
    // position: "absolute",
    // left: "0px",
    width: "12vw",
    backgroundColor: "white",
  },
  dashboardArea: {
    minHeight: "100vh",
    minWidth: "100%",
    color: "white",
    marginTop: "5vh",
  },
  toolBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "9vh",
  },
}));

function Index() {
  const classes = useStylesIndex();
  const importedClasses = useStyles();
  const [suppliers, setSuppliers] = useState([])
  const [employees, setEmployees] = useState([])
  const [headsOfDepartments, setHeadsOfDepartments] = useState([]);

  useEffect(()=> {

  }, [suppliers, employees, headsOfDepartments])
  return (
    <Grid container >
      <Grid item xs={2} sm={1} className={`${classes.navigationArea}`}>
        <Toolbar className={classes.toolBar}>
          <IconButton>
            <MenuOpenIcon />
          </IconButton>
          <Divider />
          <IconButton>
            <ShoppingBasketIcon />
          </IconButton>
          <IconButton>
            <PeopleIcon />
          </IconButton>
        </Toolbar>
      </Grid>
      <Grid item xs={10} sm={11}>
        <Users />
      </Grid>
    </Grid>
  );
}

export default Index;
