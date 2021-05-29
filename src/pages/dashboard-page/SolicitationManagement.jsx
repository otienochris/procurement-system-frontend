import React, {useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import {Tab, Tabs} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useStyles} from "./Users";
import OrderManagement from "./OrderManagement";
import Contracts from "./Contracts";
import Solicitations from "./Solicitations";
import {fetchPO} from "./forms/FormRequestForInformaton";

const SolicitationManagement = () => {

    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Paper className={classes.bodySection}>
            <AppBar position={"static"} color={"default"}>
                <Tabs value={selectedTab} onChange={handleChange} centered={true}>
                    <Tab label={"Solicitations"}/>
                    <Tab label={"Contracts"}/>
                    <Tab label={"Order Management"}/>
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <Solicitations />}
            {selectedTab === 1 && <Contracts />}
            {selectedTab === 2 && <OrderManagement/>}
        </Paper>)
}

export default SolicitationManagement;