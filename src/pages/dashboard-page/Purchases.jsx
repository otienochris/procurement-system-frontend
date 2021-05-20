import { AppBar, Paper, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import PurchaseOrders from "./PurchaseOrders";
import PurchaseRequisitions from "./PurchaseRequisitions";
import { useStyles} from "./Users";

const Purchases = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper className={classes.bodySection}>
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
