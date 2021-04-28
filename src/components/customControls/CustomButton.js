import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(3),
  },
}));

function CustomButton(props) {
  const { variant, text, color, ...others } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.buttonStyle}
      variant={variant || "contained"}
      color={color || "primary"}
      {...others}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
