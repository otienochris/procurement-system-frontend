import React, { useState } from "react";
import {
  AppBar,
  CircularProgress,
  Grid,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import CustomPaper from "../../components/customControls/CustomPaper";
import EmployeeSignupForm from "./EmployeeSignupForm";
import SignupSupplier from "./SupplierSignUp";
import HeadOfDepartment from "./HeadOfDepartment";
import SignupSuccess from "./SignupSuccess";

export const useStyles = makeStyles((theme) => ({
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
  tabStyle: {
    // width: "100%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // backgroundColor: "green",
  },
  spacingStyle: {
    marginBottom: theme.spacing(3),
  },
}));

function Index() {
  const classes = useStyles();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // for the tabs
  const [selectedTab, setSelectedTab] = useState(1);
  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  //for posting data
  const postData = async (url, requestHeader) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, requestHeader);
      const result = await response.json();

      console.log(result);
      if (response.ok) {
        setIsSuccessful(true);
        alert("please verify your email to activate your account");
      } else {
        alert(result.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid xs={1} item md={4} sm={3}></Grid>
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          className={classes.contentArea}
          // direction="column"
        >
          {isSuccessful ? (
            <SignupSuccess />
          ) : !isLoading ? (
            <CustomPaper>
              <AppBar
                position="static"
                color="default"
                className={classes.tabStyle}
              >
                <Tabs value={selectedTab} onChange={handleChange} centered>
                  <Tab label="Employee" />
                  <Tab label="Supplier" />
                  <Tab label="Head Of Department" />
                </Tabs>
              </AppBar>
              {selectedTab === 0 && <EmployeeSignupForm postData={postData} />}
              {selectedTab === 1 && <SignupSupplier postData={postData} />}
              {selectedTab === 2 && <HeadOfDepartment postData={postData} />}
            </CustomPaper>
          ) : (
            <CustomPaper>
              <CircularProgress />
            </CustomPaper>
          )}
        </Grid>
        <Grid item xs={1} sm={3} md={4}></Grid>
      </Grid>
    </div>
  );
}

export default Index;
