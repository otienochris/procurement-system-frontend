import React, {useState} from "react";
import {AppBar, CircularProgress, Grid, makeStyles, Tab, Tabs,} from "@material-ui/core";
import CustomPaper from "../../components/customControls/CustomPaper";
import SignupSupplier from "./SupplierSignUp";
import SignupSuccess from "./SignupSuccess";
import EmployeeSignup from "./EmployeeSignup";
import DepartmentHeadsSignup from "./DepartmentHeadsSignup";

export const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: "85vh",
        width: "100vw",
    },
    contentArea: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    paperArea: {
        width: "100%",
        minHeight: "70%",
    },
    tabStyle: {
        // width: "100%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        // backgroundColor: "green",
    },
    spacingStyle: {
        marginBottom: theme.spacing(3),
    },
    error: {
        color: "red",
    },
    inputLabel: {
        marginLeft: theme.spacing(1.5),
    },
    formStyle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        maxWidth: "60%",
        minHeight: "80%",
    },
}));

function Index() {
    const classes = useStyles();
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // for the tabs
    const [selectedTab, setSelectedTab] = useState(1);
    const handleChange = (event, newTab) => {
        setSelectedTab(newTab);
    };

    return (
        <div>
            <Grid container className={classes.container}>
                <Grid xs={1} item md={4} sm={3}></Grid>
                <Grid
                    item
                    xs={10}
                    sm={6}
                    md={4}
                    className={classes.contentArea}
                    // direction="column"
                >
                    {isSuccessful ? (
                        <SignupSuccess/>
                    ) : !isLoading ? (
                        <CustomPaper>
                            <AppBar
                                position="static"
                                color="default"
                                className={classes.tabStyle}
                            >
                                <Tabs value={selectedTab} onChange={handleChange} centered>
                                    <Tab label="Employee"/>
                                    <Tab label="Supplier"/>
                                    <Tab label="Head Of Department"/>
                                </Tabs>
                            </AppBar>
                            {selectedTab === 0 && <EmployeeSignup setIsLoading={setIsLoading} setIsSuccessful={setIsSuccessful}/>}
                            {selectedTab === 1 && <SignupSupplier setIsLoading={setIsLoading} setIsSuccessful={setIsSuccessful}/>}
                            {selectedTab === 2 && <DepartmentHeadsSignup setIsLoading={setIsLoading} setIsSuccessful={setIsSuccessful}/>}
                        </CustomPaper>
                    ) : (
                        <CustomPaper>
                            <CircularProgress/>
                        </CustomPaper>
                    )}
                </Grid>
                <Grid item xs={1} sm={3} md={4}></Grid>
            </Grid>
        </div>
    );
}

export default Index;
