import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {useStyles} from "../index";

const schema = yup.object().shape({
    departmentId: yup.string().required("Department Id is required"),
    empId: yup.string().required("Employment Id is required"),
    email: yup.string().email("Enter a valid email").required(),
    name: yup.string().required("Name is required"),
    password: yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password must be of length 8+, \n contain letters,\n numbers and symbols"
    ).required("Password is required"),
    password2: yup.string().oneOf([yup.ref("password")], "passwords do not match")
})

const FormDepartmentsHeadsSignup = (props) => {

    const {handleFormSubmit} = props;
    const classes = useStyles();

    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema)
    });
    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleFormSubmit)}>
            <CustomTextField
                label={"Department Id"} p
                laceholder={"enter department Id"}
                fullWidth
                {...register("departmentId")}
                inputError={errors.departmentId}/>
            <CustomTextField
                label="Employee Id"
                placeholder="Enter your Employee Id"
                fullWidth
                {...register("empId")}
                inputError={errors.empId}
            />
            <CustomTextField
                label={"Full Name"}
                placeholder={"Enter your full name"}
                fullWidth
                {...register("name")}
                inputError={errors.name}
            />
            <CustomTextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                fullWidth
                {...register("email")}
                inputError={errors.email}
            />
            <CustomTextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                fullWidth
                {...register("password")}
                inputError={errors.password}
            />
            <CustomTextField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                fullWidth
                {...register("password2")}
                inputError={errors.password2}
            />
            <CustomButton text={"submit"} type={"submit"}/>
        </form>
    )
}

export default FormDepartmentsHeadsSignup;