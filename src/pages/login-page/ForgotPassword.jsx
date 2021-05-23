import {
  ButtonGroup,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
  sendChangePasswordTokenUrl,
} from "../../components/requestHeaders";
import ChangePassword from "./ChangePassword";
import {options} from "./index";
import {toast} from "react-toastify";

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

function ForgotPassword(props) {
  const { setForgotPassword } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);

  const emailSchema = yup.object().shape({
    email: yup.string().email("Enter a valid email").required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(emailSchema),
  });

  const sendMail = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        sendChangePasswordTokenUrl,
        requestHeaderWithBodyBeforeAuthentication(email)
      );
      const result = response.json();
      console.log(result);

      setIsLoading(false);
      if (response.ok) {
        // setForgotPassword(false);
        setIsSuccess(true);
        toast.success("Check your mail to change your password", options)
      } else {
        // setForgotPassword(false);
        toast.error("Error sending mail. make sure it is the correct email address", options)

      }
    } catch (fetchErrors) {
      setForgotPassword(false);
      setIsLoading(false);
      toast.info("Oop! Could not reach the server", options)
    }
  };

  const onSubmit = (inputData) => {
    sendMail(inputData).then();
    reset();
  };

  return (
    <>
      {success ? (
        <ChangePassword setForgotPassword={setForgotPassword}/>
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
            Forgot Password
          </Typography>
          <div className={classes.underline}></div>
          <form
            className={classes.contentArea}
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomTextField
              label="email"
              placeholder="Enter your email"
              variant="outlined"
              type="email"
              fullWidth
              autoComplete="off"
              {...register("email")}
              inputError={errors.email}
            />
            <ButtonGroup className={classes.buttonGroup}>
              <CustomButton
                size="small"
                text="go back"
                color="default"
                variant="contained"
                onClick={() => setForgotPassword(false)}
              />
              <CustomButton
                size="small"
                text="submit"
                type="submit"
                variant="contained"
                color="primary"
              />
            </ButtonGroup>
          </form>
        </CustomPaper>
      )}
    </>
  );
}

export default ForgotPassword;
