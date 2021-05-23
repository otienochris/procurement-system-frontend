import {ButtonGroup, Paper, Typography} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import CustomButton from "../../components/customControls/CustomButton";
import CustomTextField from "../../components/customControls/CustomTextField";
import {Link} from "react-router-dom";
import {isLoggedInActions, userActions} from "../../actions/";
import {authenticationUrl, requestHeaderWithBodyBeforeAuthentication,} from "../../components/requestHeaders";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {options} from "./index";
import {toastOptions} from "../../App";

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .matches(
            /^([A-Z]\d{2}\/\d{5}\/\d{2})$|^[A-Z]\d{9}[A-Z]$/,
            "enter a valid username"
        )
        .required("please enter your username"),
    password: yup.string().required("please enter your password"),
});

function LoginForm({
                       setIsLoading,
                       setIsUserDisabled,
                       customClasses,
                       setForgotPassword,
                   }) {
    const dispatch = useDispatch();

    const fetchData = async (inputData) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                authenticationUrl,
                requestHeaderWithBodyBeforeAuthentication(inputData)
            );
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                dispatch(isLoggedInActions("SIGN_IN"));
                dispatch({type: "SET_TOKEN", payload: result.token});
                toast.info("Welcome back", toastOptions);
            } else {
                if (result.message === "User is disabled") {
                    setIsUserDisabled(true);
                    toast.info("User is Disabled. Please check your mail and use the code sent to active your account", options);
                } else {
                    toast.error("Error logging you in. Please recheck your credentials and try again", options)
                }
            }
            if (result.message === "User is disabled") {
                setIsUserDisabled(true);
                toast.info("User is Disabled. Please check your mail and use the code sent to active your account", options);
            }
        } catch (errors) {
            toast.error("Error connecting to the server", options);
            setIsLoading(false);
        }
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(loginSchema),
        criteriaMode: "all",
    });

    const submitForm = (inputData) => {
        dispatch(userActions("SET_USERNAME", inputData.username));
        fetchData(inputData).then();
        reset();
    };

    return (
        <>
            <Paper
                style={{marginTop: "12vh"}}
                className={`${customClasses.paperArea} ${customClasses.contentArea}`}
            >
                <Typography
                    color="textPrimary"
                    align="center"
                    variant="h2"
                    className="headings"
                >
                    Login
                </Typography>
                <div className={customClasses.underline}></div>

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className={customClasses.contentArea}
                >
                    <CustomTextField
                        label="username"
                        placeholder="please insert kra/employee id"
                        fullWidth
                        {...register("username")}
                        inputError={errors.username}
                    />
                    <CustomTextField
                        label="password"
                        placeholder="please insert your password"
                        type="password"
                        fullWidth
                        {...register("password")}
                        inputError={errors.password}
                    />
                    <CustomButton
                        className={customClasses.buttonStyle}
                        type="submit"
                        fullWidth
                        onClick={() => setForgotPassword(false)}
                        text="Log in"
                    />
                    <div>
                        <ButtonGroup style={{marginBottom: "3vh"}}>
                            <CustomButton
                                text="Sign up"
                                variant="outlined"
                                color="default"
                                component={Link}
                                to="/signup"
                            />
                            <CustomButton
                                text="Change Password"
                                variant="outlined"
                                color="default"
                                onClick={() => setForgotPassword(true)}
                            />
                        </ButtonGroup>
                    </div>
                </form>
            </Paper>
        </>
    );
}

export default LoginForm;
