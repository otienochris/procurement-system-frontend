import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import CustomPaper from "../../components/customControls/CustomPaper";

const useStyles = makeStyles((theme) => ({
  sections: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  newsSection: {
    minHeight: "100vh",
    backgroundColor: "black",
  },
  openTendersSection: {
    minHeight: "100%",
    backgroundColor: "blue",
  },
  closedTendersSection: {
    minHeight: "100%",
    backgroundColor: "brown",
  },
}));

function Index() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid container item direction="column" className={classes.newsSection}>
        <Paper className={`${classes.newsSection} ${classes.sections}`}>
          <Typography> News Section</Typography>
        </Paper>
      </Grid>
      <Grid container item direction="column">
        <Paper className={`${classes.openTendersSection} ${classes.sections}`}>
          <Typography> Open Tenders</Typography>
        </Paper>
      </Grid>
      <Grid container item direction="column">
        <Paper className={`${classes.closedTendersSection} ${classes.sections}`}>
          <Typography> Closed Tenders</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Index;
