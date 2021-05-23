import {Typography} from "@material-ui/core";
import React from "react";
import AccountActivation from "../../components/AccountActivation";
import CustomPaper from "../../components/customControls/CustomPaper";
import {useStyles} from "./index";

const SignupSuccess = () => {
    const classes = useStyles();
    return (
        <CustomPaper>
            <div className={`${classes.contentArea} ${classes.spacingStyle}`}>
                <Typography variant="h6">
                    Your account is successfully creaated
                </Typography>
                <Typography variant="body">
                    Please enter the code sent to your email to activate your account
                </Typography>
                <AccountActivation/>
            </div>
        </CustomPaper>
    );
};

export default SignupSuccess;
