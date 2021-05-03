import {
  ButtonGroup,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import React, {  } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/customControls/CustomButton";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/customControls/CustomTextField";
import { isLoggedInActions, tokenActions, userActions } from "../../actions/";
import {
  authenticationUrl,
  requestHeaderWithBodyBeforeAuthentication,
} from "../../components/requestHeaders";

function LoginForm({setIsLoading, setIsUserDisabled, customClasses, dispatch, setForgotPassword}) {

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

  const fetchData = async (inputData) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        authenticationUrl,
        requestHeaderWithBodyBeforeAuthentication(inputData)
      );
      const result = await response.json();
      setIsLoading(false);
      console.log(result);
      if (response.ok) {
        dispatch(isLoggedInActions("SIGN_IN"));
        dispatch(tokenActions("SET_TOKEN", result.token));
      } else {
        alert(result.message);
      }
      if (result.message === "User is disabled") {
        setIsUserDisabled(true);
      }
    } catch (errors) {
      console.log(errors);
      alert(
        "Sorry, failed to connenct to the server, please check your connection."
      );
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
    dispatch(userActions("SET_USERNAME", inputData.username));
    fetchData(inputData);
    reset();
  };

  return (
    <Paper className={`${customClasses.paperArea} ${customClasses.contentArea}`}>
      <Typography
        color="textPrimary"
        align="center"
        variant="h2"
        className="headings"
      >
        Login
      </Typography>
      <div className={customClasses.underline}></div>

      <form onSubmit={handleSubmit(submitForm)} className={customClasses.contentArea}>
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
        <Divider />

        <div>
          <ButtonGroup>
            <CustomButton
              text="Sign up"
              variant="outlined"
              color="default"
              component={Link}
              to="/signup"
            />
            <CustomButton
              text="Change Passord"
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
