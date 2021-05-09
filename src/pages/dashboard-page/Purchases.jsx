import { AppBar, Paper, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles as employeeStyles } from "./Employees";
import PurchaseOrders from "./PurchaseOrders";
import PurchaseRequisitions from "./PurchaseRequisitions";
import { useStyles as usersStyles } from "./Users";
const Purchases = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const empClasses = employeeStyles();
  const usersClasses = usersStyles();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper className={usersClasses.bodySection}>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleChange} centered >
          <Tab label="Purchase Requisitions" />
          <Tab label="Purchase Orders" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <PurchaseRequisitions />}
      {selectedTab === 1 && <PurchaseOrders/> }
    </Paper>
  );
};

export default Purchases;
