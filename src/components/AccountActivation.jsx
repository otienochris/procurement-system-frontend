import { ButtonGroup, CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../pages/signup-page";
import CustomButton from "./customControls/CustomButton";
import CustomPaper from "./customControls/CustomPaper";
import CustomTextField from "./customControls/CustomTextField";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import {
  activateAccounturl,
  requestHeaderWithBodyBeforeAuthentication,
} from "./requestHeaders";

const AccountActivation = ({ setIsUserDisabled }) => {
  const classes = useStyles();
  const { register, reset, handleSubmit } = useForm();
  const [isActivated, setIsActivated] = useState(false);
  const [verCodeSent, setVerCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const username = useSelector((state) => state.userDetails.username);

  const fetchData = async (completeUrl) => {
    setIsLoading(true);
    try {
      const response = await fetch(completeUrl);
      const result = await response.json();
      if (result.ok) {
        setIsLoading(false);
        setIsActivated(true);
        setIsUserDisabled(false);
        alert("Account successful activated. Please log in");
      } else {
        alert(result.message);
      }
      setIsLoading(false);
    } catch (errors) {
      console.log(errors);
    }
  };

  const sendVerCode = async (url, data) => {
    setIsLoading(true);
    const response = await fetch(
      url,
      requestHeaderWithBodyBeforeAuthentication(data)
    );
    const result = await response.json();
    if (result.ok) {
      setIsLoading(false);
      setVerCodeSent(true);
      alert("Verification code sent successful");
    } else {
      setIsLoading(false);
      alert(result.message);
    }
  };

  const handleSendCodeButton = () => {
    sendVerCode(activateAccounturl + "sendCode/", username).then();
    reset();
  };
  const handleActivateAccount = (data) => {
    fetchData(activateAccounturl + data.code).then();

    setVerCodeSent(false);
    setIsActivated(true);
    // setIsUserDisabled(false);

    reset();
  };
  return (
    <>
      {isActivated ? (
        <Redirect to="/login" />
      ) : verCodeSent ? (
        <>
          <AccountActivation />
          {alert("activate your account")}
        </>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <CustomPaper>
          <Typography variant="h6" className={classes.spacingStyle}>
            Email Verification:
          </Typography>
          <form
            className={classes.contentArea}
            onSubmit={handleSubmit(handleActivateAccount)}
          >
            <CustomTextField
              label="code"
              placeholder="activation code"
              fullWidth
              {...register("code")}
            />
            <ButtonGroup color="primary" fullWidth>
              <CustomButton text="submit" variant="contained" type="submit" />
              <CustomButton text="resend" onClick={handleSendCodeButton} />
            </ButtonGroup>
          </form>
        </CustomPaper>
      )}
    </>
  );
};

export default AccountActivation;
