import React, { useState } from "react";
import { AppBar, Grid, makeStyles, Tab, Tabs } from "@material-ui/core";
import CustomPaper from "../../components/customControls/CustomPaper";
import EmployeeSignupForm from "./EmployeeSignupForm"
import SignupSupplier from "./SupplierSignUp"
import HeadOfDepartment from "./HeadOfDepartment"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "85vh",
    width: "100vw",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paperArea: {
    width: "100%",
    minHeight: "70%",
  },
}));

function Index() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid xs={1} sm={3}></Grid>
        <Grid
          item
          xs={10}
          sm={6}
          className={classes.contentArea}
          direction="column"
        >
          <CustomPaper>
            <AppBar position="static" color="default">
              <Tabs value={selectedTab} onChange={handleChange} centered>
                <Tab label="Employee" />
                <Tab label="Supplier" />
                <Tab label="Head Of Department" />
              </Tabs>
            </AppBar>
            {selectedTab === 0 && <EmployeeSignupForm />}
            {selectedTab === 1 && <SignupSupplier />}
            {selectedTab === 2 && <HeadOfDepartment />}
          </CustomPaper>
        </Grid>
        <Grid xs={1} sm={3}></Grid>
      </Grid>
    </div>
  );
}

export default Index;
