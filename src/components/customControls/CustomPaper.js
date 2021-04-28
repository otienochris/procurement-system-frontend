import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  contentArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paperArea: {
    width: "100%",
    minHeight: "70%",
    marginBottom: theme.spacing(3),
    marginTop: "10vh",
  },
}));
function CustomPaper(props) {
  const classes = useStyles();
  const { children, elavation } = props;
  return (
    <Paper
      className={`${classes.paperArea} ${classes.contentArea}`}
      elavation={elavation || 3}
    >
      {children}
    </Paper>
  );
}

export default CustomPaper;
