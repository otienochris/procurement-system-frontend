import { AppBar, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import Suppliers from "./Suppliers";
import Employees from "./Employees";
import DepartmentHeads from "./DepartmentHeads";

export const useStyles = makeStyles((theme) => ({
  bodySection: {
    minWidth: "80vw",
    minHeight: "91.6vh",
    marginTop: "8.5vh",
  },
}));

function Users({ employees, suppliers, departmentHeads, setEmployees, setSuppliers, setDepartmentHeads }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper className={classes.bodySection}>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Supplier" />
          <Tab label="Employee" />
          <Tab label="Head of Department" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Suppliers />}
      {selectedTab === 1 && <Employees />}
      {selectedTab === 2 && <DepartmentHeads />}
    </Paper>
  );
}

export default Users;
