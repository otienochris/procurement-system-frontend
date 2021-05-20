import { ButtonGroup, Divider, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/customControls/CustomButton";
import CustomTextField from "../../components/customControls/CustomTextField";
import { Link } from "react-router-dom";
import { isLoggedInActions, tokenActions, userActions } from "../../actions/";
import {
  authenticationUrl,
  requestHeaderWithBodyBeforeAuthentication,
} from "../../components/requestHeaders";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^([A-Z]\d{2}\/\d{5}\/\d{2})|([A-Z]\d{9}[A-Z])$/,
      "enter a valid username"
    )
    .required("please enter your unsername"),
  password: yup.string().required("please enter your password"),
});

function LoginForm({
  setIsLoading,
  setIsUserDisabled,
  customClasses,
  setForgotPassword,
}) {
  const dispatch = useDispatch();

  const fetchData = async (inputData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        authenticationUrl,
        requestHeaderWithBodyBeforeAuthentication(inputData)
      );
      const result = await response.json();
      setIsLoading(false);
      if (response.ok) {
        dispatch(isLoggedInActions("SIGN_IN"));
        dispatch({type: "SET_TOKEN", payload: result.token});
      } else {
        alert(result.message);
      }
      if (result.message === "User is disabled") {
        setIsUserDisabled(true);
      }
    } catch (errors) {
      // console.log(errors)
      // alert(
      //   inputData.username + "Sorry, failed to connenct to the server, please check your connection."
      // );
      alert(errors)
      setIsLoading(false);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    criteriaMode: "all",
  });

  const submitForm = (inputData) => {
    console.log(inputData)
    dispatch(userActions("SET_USERNAME", inputData.username));
    fetchData(inputData);
    reset();
  };

  return (
    <Paper
    style={{marginTop:"12vh"}}
      className={`${customClasses.paperArea} ${customClasses.contentArea}`}
    >
      <Typography
        color="textPrimary"
        align="center"
        variant="h2"
        className="headings"
      >
        Login
      </Typography>
      <div className={customClasses.underline}></div>

      <form
        onSubmit={handleSubmit(submitForm)}
        className={customClasses.contentArea}
      >
        <CustomTextField
          label="username"
          placeholder="please insert kra/employee id"
          fullWidth
          {...register("username")}
          inputError={errors.username}
        />
        <CustomTextField
          label="password"
          placeholder="please insert your password"
          type="password"
          fullWidth
          {...register("password")}
          inputError={errors.password}
        />
        <CustomButton
          className={customClasses.buttonStyle}
          type="submit"
          fullWidth
          onClick={() => setForgotPassword(false)}
          text="Log in"
        />
        <div>
          <ButtonGroup style={{marginBottom:"3vh"}}>
            <CustomButton
              text="Sign up"
              variant="outlined"
              color="default"
              component={Link}
              to="/signup"
            />
            <CustomButton
              text="Change Password"
              variant="outlined"
              color="default"
              onClick={() => setForgotPassword(true)}
            />
          </ButtonGroup>
        </div>
      </form>
    </Paper>
  );
}

export default LoginForm;
