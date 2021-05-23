import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CustomPaper from "../../components/customControls/CustomPaper";
import CustomTextField from "../../components/customControls/CustomTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/customControls/CustomButton";
import {
  changePasswordUrl,
  requestHeaderWithBodyBeforeAuthentication,
} from "../../components/requestHeaders";
import { Redirect } from "react-router";
import {toast} from "react-toastify";
import {options} from "./index";

const useStyles = makeStyles((theme) => ({
  underline: {
    width: "200px",
    borderBottom: "5px solid orange",
    marginBottom: "30px",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    margin: theme.spacing(2),
    position: "relative",
    top: "50px",
  },
}));

function ChangePassword({setForgotPassword}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);

  const changePasswordSchema = yup.object().shape({
    token: yup.string().required("token is required"),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password must be of legth 8+, contain letters, numbers and symbols"
      )
      .required(),
    newPassword2: yup
      .string()
      .oneOf([yup.ref("newPassword")], "passwords do not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(changePasswordSchema),
  });

  const submitNewPassword = async (newPassword) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        changePasswordUrl,
        requestHeaderWithBodyBeforeAuthentication(newPassword)
      );
      const result = response.json();
      console.log(result);

      setIsLoading(false);
      if (response.ok) {
        setIsSuccess(true);
        setForgotPassword(false);
        toast.success("Password changed successfully", options);
      } else {
        toast.error("Error while changing password", options);
      }
    } catch (fetchErrors) {
      setIsLoading(false);
      toast.info("Oop! Could not connect to the server", options);
    }
  };

  const onSubmit = (inputData) => {
    delete inputData.newPassword2; // we don't need the confirm password
    console.log(inputData);
    submitNewPassword(inputData).then();
    reset();
  };

  return (
    <>
      {success ? (
        <Redirect to="/login" />
      ) : isLoading ? (
        <CustomPaper>
          <CircularProgress />
        </CustomPaper>
      ) : (
        <CustomPaper>
          <Typography
            color="textPrimary"
            align="center"
            variant="h4"
            className="headings"
          >
            Change Password
          </Typography>
          <div className={classes.underline}></div>
          <form
            className={classes.contentArea}
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomTextField
              label="Token"
              placeholder="Enter Token From Mail"
              variant="outlined"
              fullWidth
              autoComplete="off"
              {...register("token")}
              inputError={errors.token}
            />
            <CustomTextField
              label="New Password"
              placeholder="Enter new password"
              variant="outlined"
              type="password"
              fullWidth
              autoComplete="off"
              {...register("newPassword")}
              inputError={errors.newPassword}
            />
            <CustomTextField
              label="Confirm New Password"
              placeholder="Match the password above"
              variant="outlined"
              type="password"
              fullWidth
              autoComplete="off"
              {...register("newPassword2")}
              inputError={errors.newPassword2}
            />
            <CustomButton
              size="small"
              text="submit"
              type="submit"
              variant="contained"
              color="primary"
            />
          </form>
        </CustomPaper>
      )}
    </>
  );
}

export default ChangePassword;
