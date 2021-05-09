import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import AccountActivation from "../../components/AccountActivation";
import CustomPaper from "../../components/customControls/CustomPaper";
import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";

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
  underline: {
    width: "100px",
    borderBottom: "5px solid orange",
    marginBottom: "10px",
  },
  buttonStyle: {
    margin: theme.spacing(3),
  },
}));

function Index() {
  const customClasses = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [isUserDisabled, setIsUserDisabled] = useState(false);

  // const dispatch = useDispatch();

  return (
    <Grid container className={customClasses.container}>
      <Grid item xs={1} sm={4}></Grid>
      <Grid item xs={10} sm={4} className={customClasses.contentArea}>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : isUserDisabled ? (
          <AccountActivation />
        ) : isLoading ? (
          <CustomPaper>
            <CircularProgress />
          </CustomPaper>
        ) : forgotPassword ? (
          <ForgotPassword setForgotPassword={setForgotPassword} />
        ) : (
          <LoginForm
            setIsLoading={setIsLoading}
            setIsUserDisabled={setIsUserDisabled}
            // dispatch={dispatch}
            customClasses={customClasses}
            setForgotPassword={setForgotPassword}
          />
        )}
      </Grid>
      <Grid item xs={1} sm={4}></Grid>
    </Grid>
  );
}

export default Index;
