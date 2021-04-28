import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  textFieldStyle: {
    margin: theme.spacing(2),
  },
}));

function CustomTextField(props) {
  const classes = useStyles();
  const { label, inputError, placeholder, color, helperText, autoComplete, variant, ...others } = props;
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      color={color || "primary"}
      autoComplete={autoComplete || "off"}
      variant={variant || "outlined"}
      className={classes.textFieldStyle}
      error={inputError ? true : false}
      helperText={inputError?.message}
      {...others}
    />
  );
}

export default CustomTextField;
