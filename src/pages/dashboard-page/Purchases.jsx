import { AppBar, Paper, Tab, Tabs } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PurchaseOrders from "./PurchaseOrders";
import PurchaseRequisitions from "./PurchaseRequisitions";
import { useStyles} from "./Users";
import {useSelector} from "react-redux";

const Purchases = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const role = useSelector(state => state.userDetails.role)
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper className={classes.bodySection}>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleChange} centered >
          {(role === "ROLE_ADMIN" || role === "ROLE_DEPARTMENT_HEAD") && <Tab label="Purchase Requisitions"/>}
          {(role === "ROLE_ADMIN") && <Tab label="Purchase Orders"/>}
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (role === "ROLE_ADMIN" || role === "ROLE_DEPARTMENT_HEAD") && <PurchaseRequisitions />}
      {(selectedTab === 1 && role === "ROLE_ADMIN") && <PurchaseOrders/> }
    </Paper>
  );
};

export default Purchases;
