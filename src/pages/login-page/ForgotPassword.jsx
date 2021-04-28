import {
  ButtonGroup,
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
    // justifySelf: "flex-end"
    // justifySelf: "flex-end"
    position: "relative",
    top: "50px",
  },
}));

function ForgotPassword(props) {
  const { setForgotPassword } = props;
  const classes = useStyles();
  const [emailAdd, setEmailAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);

  const emailSchema = yup.object().shape({
    email: yup.string().email("Enter a valid email").required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(emailSchema),
  });

  const url = "http://192.168.137.1:8080/api/v1/users/changePassword";
  const requestHeader = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailAdd),
  };

  const sendMail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, requestHeader);
      const result = response.json();
      console.log(result);

      setIsLoading(false);
      if (response.ok) {
        setIsSuccess(true);
        alert("Check your mail to change your password");
      } else {
        alert(
          "Error while sending mail. make sure it is the correct email address"
        );
      }
    } catch (fetchErrors) {
      setIsLoading(false);
      console.log(fetchErrors);
    }
  };

  const onSubmit = (inputData) => {
    setEmailAdd(inputData);
    sendMail();
  };
  return (
    <>
      {!isLoading ? (
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
      ) : (
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
      )}
    </>
  );
}

export default ForgotPassword;
