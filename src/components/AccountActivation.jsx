import {ButtonGroup, CircularProgress, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {useStyles} from "../pages/signup-page";
import CustomButton from "./customControls/CustomButton";
import CustomPaper from "./customControls/CustomPaper";
import CustomTextField from "./customControls/CustomTextField";
import {useForm} from "react-hook-form";
import {Redirect} from "react-router";
import {useSelector} from "react-redux";
import {activateAccounturl, requestHeaderWithBodyBeforeAuthentication,} from "./requestHeaders";
import {toast} from "react-toastify";
import {options} from "../pages/login-page";
import {toastOptions} from "../App";

const AccountActivation = ({setIsUserDisabled}) => {
    const classes = useStyles();
    const {register, reset, handleSubmit} = useForm();
    const [isActivated, setIsActivated] = useState(false);
    const [verCodeSent, setVerCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const username = useSelector((state) => state.userDetails.username);

    const fetchData = async (completeUrl) => {
        setIsLoading(true);
        try {
            const response = await fetch(completeUrl);
            const result = await response.json();
            if (result.ok) {
                setIsLoading(false);
                setIsActivated(true);
                setIsUserDisabled(false);
                toast.success("Account successful activated. Please log in", options);
            } else {
                toast.error("Error activating your account. Recheck your code and try again", options);
            }
            setIsLoading(false);
        } catch (errors) {
            setIsLoading(false)
            toast.info("Oops! Could not connect to the server", options);
        }
    };

    const sendVerCode = async (url, data) => {
        setIsLoading(true);
        await fetch(
            url,
            requestHeaderWithBodyBeforeAuthentication(data)
        ).then(response => {
            if (response.ok){
                setVerCodeSent(true);
                toast.info("Verification code sent successful", options)
            } else {
                toast.error("Error sending code please provide a valid email", options)
            }
            setIsLoading(false);
            return response
        }).then().catch(reason => {
            setIsLoading(false);
            toast.info("Oop! Could not reach the server", options);
        })
    };

    const handleSendCodeButton = async () => {
        await sendVerCode(activateAccounturl + "sendCode/", username)
            .then().then().catch(reason => {

        });
        reset();
    };
    const handleActivateAccount = (data) => {
        fetchData(activateAccounturl + data.code).then();

        setVerCodeSent(false);
        setIsActivated(true);
        // setIsUserDisabled(false);

        reset();
    };
    return (
        <>
            {isActivated ? (
                <Redirect to="/login"/>
            ) : verCodeSent ? (
                <>
                    <AccountActivation/>
                    {alert("activate your account")}
                </>
            ) : isLoading ? (
                <CircularProgress/>
            ) : (
                <CustomPaper>
                    <Typography variant="h6" className={classes.spacingStyle}>
                        Email Verification:
                    </Typography>
                    <form
                        className={classes.contentArea}
                        onSubmit={handleSubmit(handleActivateAccount)}
                    >
                        <CustomTextField
                            label="code"
                            placeholder="activation code"
                            fullWidth
                            {...register("code")}
                        />
                        <ButtonGroup color="primary" fullWidth>
                            <CustomButton text="submit" variant="contained" type="submit"/>
                            <CustomButton text="resend" onClick={handleSendCodeButton}/>
                        </ButtonGroup>
                    </form>
                </CustomPaper>
            )}
        </>
    );
};

export default AccountActivation;
