import React, {useState} from 'react'
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import {Tab, Tabs} from "@material-ui/core";
import {useStyles} from "./Users";
import RequestForQuotations from "./RequestForQuotations";
import RequestsForInformation from "./RequestsForInformation";

const Requests = () => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Paper className={classes.bodySection}>
            <AppBar position={"static"} color={"default"}>
                <Tabs value={selectedTab} onChange={handleChange} centered={true}>
                    <Tab label={"Request For Quotation"}/>
                    <Tab label={"Request For Information"}/>
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <RequestForQuotations/>}
            {selectedTab === 1 && <RequestsForInformation/>}
        </Paper>
    )
}

export default Requests
