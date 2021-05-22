import React from "react";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {useStyles} from "../index";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(6, "name must be at least 5 characters")
        .max(50, "name cannot exceed 8 characters")
        .required("name cannot be empty"),
    empId: yup
        .string()
        .matches(/^[A-Z]\d{2}\/\d{5}\/\d{2}$/, "enter a valid employment id")
        .required(),
    email: yup.string().email("enter a valid email").required(),
    position: yup.string().required(),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "password must be of length 8+, contain letters, numbers and symbols"
        )
        .required("password cannot be empty"),
    password2: yup
        .string()
        .oneOf([yup.ref("password")], "passwords do no match")
        .required("please match the password above"),
});

const FormEmployeeSignup = (props) => {
    const {handleFormSubmit} = props;
    const classes = useStyles()

    const {
        register,
        // reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={classes.contentArea}
        >
            <CustomTextField
                label="full name"
                placeholder="please enter your full name"
                fullWidth
                {...register("name")}
                inputError={errors.name}
            />
            <CustomTextField
                label="Employee Id"
                placeholder="Please enter your employee id"
                fullWidth
                {...register("empId")}
                inputError={errors.empId}
            />
            <FormControl fullWidth>
                <InputLabel className={classes.inputLabel}>Position</InputLabel>
                <Select
                    native
                    variant="outlined"
                    {...register("position")}
                    error={!!errors.position}
                >
                    <option value=""></option>
                    <option value="PROCUREMENT_OFFICER">Procurement officer</option>
                    <option value="INVENTORY_MANAGER">Inventory Manager</option>
                    <option value="FINANCE">Finance</option>
                    <option value="INTERN">Intern</option>
                    <option value="HUMAN_RESOURCE_MANAGER">Human Resource Manager</option>
                    <option value="PROCUREMENT_MANAGER">Procurement Manager</option>
                    <option value="STORES_MANAGER">Stores Manager</option>
                    <option value="PURCHASING_ASSISTANT">Purchasing Assistant</option>
                    <option value="ICT_MANAGER">ICT Manager</option>

                </Select>
                <FormHelperText className={`${classes.error} ${classes.inputLabel}`}>
                    {errors.position?.message}
                </FormHelperText>
            </FormControl>
            <CustomTextField
                label="email"
                placeholder="Please enter your email"
                type="email"
                fullWidth
                {...register("email")}
                inputError={errors.email}
            />
            <CustomTextField
                label="Password"
                placeholder="Please insert your password"
                type="password"
                fullWidth
                {...register("password")}
                inputError={errors.password}
            />
            <CustomTextField
                label="Confirm Password"
                placeholder="Match the Password above"
                type="password"
                fullWidth
                {...register("password2")}
                inputError={errors.password2}
            />
            <CustomButton text="submit" type="submit" />
        </form>
    );
}

export default FormEmployeeSignup;