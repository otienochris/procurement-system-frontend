import React from "react";
import {useStyles} from "./Users";
import Paper from "@material-ui/core/Paper";

const Reports = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.bodySection}>
            <h1>Reports</h1>
        </Paper>
    )
}

export default Reports;