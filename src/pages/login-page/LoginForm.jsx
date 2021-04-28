import {
  ButtonGroup,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/customControls/CustomButton";
import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import CustomPaper from "../../components/customControls/CustomPaper";
import CustomTextField from "../../components/customControls/CustomTextField";

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

const url = "http://192.168.137.1:8080/api/v1/users/authenticate";

function LoginForm() {
  const classes = useStyles();

  const [token, setToken] = useState(null);
  const [fetchErrors, setFetchErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);

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

  const requestHeader = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, requestHeader);
      const result = await response.json();
      setToken(result);
      setIsLoading(false);
      console.log(result);
      if (!response.ok) {
        alert("Please try agains! Invalid username and password");
        // errors = "Invalid credential";
      }
    } catch (errors) {
      console.log(errors);
      setIsLoading(false);
      setFetchErrors(errors);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    criteriaMode: "all",
  });

  const submitForm = (inputData) => {
    setUserData(inputData);
    // console.log(inputData);
    fetchData();
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={1} sm={4}></Grid>
      <Grid
        item
        // direction="column"
        xs={10}
        sm={4}
        className={classes.contentArea}
      >
        {isLoading ? (
          <CustomPaper>
            <Typography
              color="textPrimary"
              align="center"
              variant="h4"
              className="headings"
            >
              Loading ...
            </Typography>
          </CustomPaper>
        ) : !forgotPassword ? (
          <Paper className={`${classes.paperArea} ${classes.contentArea}`}>
            <Typography
              color="textPrimary"
              align="center"
              variant="h2"
              className="headings"
            >
              Login
            </Typography>
            <div className={classes.underline}></div>

            <form
              onSubmit={handleSubmit(submitForm)}
              className={classes.contentArea}
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
                className={classes.buttonStyle}
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
        ) : (
          <ForgotPassword setForgotPassword={setForgotPassword} />
        )}
      </Grid>
      <Grid item xs={1} sm={4}></Grid>
    </Grid>
  );
}

export default LoginForm;
