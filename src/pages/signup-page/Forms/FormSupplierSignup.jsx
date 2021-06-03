import React, {useEffect} from "react";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {useStyles} from "../index";

const schema = yup.object().shape({
    kra: yup
        .string()
        .matches(
          /[A-Z]\d{9}\w{1,}/,
          "please enter a valid KRA pin e.g A123456789B"
        )
        .required(),
    name: yup.string().required(),
    description: yup.string().required(),
    email: yup.string().email("Please enter a valid email").required(),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "password must be of legth 8+, contain letters, numbers and symbols"
        )
        .required(),
    password2: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("This is a required field"),
});

const FormSupplierSignup = (props) => {
    const classes = useStyles()
    const {handleFormSubmit, defaultValues} = props;
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema),
        defaultValues: defaultValues
    })

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea} >
            <CustomTextField
                label="Company's Name"
                placeholder="enter company's name"
                fullWidth
                {...register("name")}
                inputError={errors.name}
            />
            <CustomTextField
                label="Company's Email"
                placeholder="enter company's email"
                fullWidth
                {...register("email")}
                inputError={errors.email}
            />
            <CustomTextField
                label="KRA pin"
                placeholder="enter company's KRA pin"
                fullWidth
                {...register("kra")}
                inputError={errors.kra}
                // inputError={errors.kRA || (!isKraValid ? "invalid kra" : null)}
            />
            <CustomTextField
                label="Description"
                placeholder="Provide a brief description of the company including your location and mode of operation"
                fullWidth
                multiline
                {...register("description")}
                inputError={errors.description}
            />
            <CustomTextField
                label="Password"
                placeholder="enter your password"
                fullWidth
                type="password"
                {...register("password")}
                inputError={errors.password}
            />
            <CustomTextField
                label="Confirm Password"
                placeholder="please confirm password"
                fullWidth
                type="password"
                {...register("password2")}
                inputError={errors.password2}
            />
            <CustomButton text="submit" type="submit"/>
        </form>
    )
}

export default FormSupplierSignup;