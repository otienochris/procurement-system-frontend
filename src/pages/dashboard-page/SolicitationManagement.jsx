import React, {useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import {Tab, Tabs} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useStyles} from "./Users";
import OrderManagement from "./OrderManagement";
import Contracts from "./Contracts";
import Solicitations from "./Solicitations";
import {useSelector} from "react-redux";
// import {fetchPO} from "./forms/FormRequestForInformaton";

const SolicitationManagement = () => {

    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const role = useSelector(state => state.userDetails.role);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Paper className={classes.bodySection}>
            <AppBar position={"static"} color={"default"}>
                <Tabs value={selectedTab} onChange={handleChange} centered={true}>
                    {role !== "ROLE_DEPARTMENT_HEAD" && <Tab label={"Solicitations"}/> }
                    {role !== "ROLE_DEPARTMENT_HEAD" && <Tab label={"Contracts"}/> }
                    <Tab label={"Order Management"}/>
                </Tabs>
            </AppBar>
            {(role !== "ROLE_DEPARTMENT_HEAD" && selectedTab === 0) && <Solicitations />}
            {(role !== "ROLE_DEPARTMENT_HEAD" && selectedTab === 1) && <Contracts />}
            {((role === "ROLE_DEPARTMENT_HEAD" && selectedTab === 0 ) || selectedTab === 2) && <OrderManagement/>}
        </Paper>)
}

export default SolicitationManagement;