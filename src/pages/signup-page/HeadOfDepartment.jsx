import React from "react";
import CustomButton from "../../components/customControls/CustomButton";
import CustomTextField from "../../components/customControls/CustomTextField";
import { useStyles } from "./EmployeeSignupForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {requestHeader} from "./index"
import { requestHeaderWithBodyBeforeAuthentication } from "../../components/requestHeaders";

const url = "http://192.168.137.1:8080/api/v1/suppliers/signup";

const HeadOfDepartment = (props) => {
  const { postData } = props;

  const headOfDepartmentSchema = yup.object().shape({
    empId: yup.string().required("Employment Id is required"),
    departmentId: yup.string().required("Department Id is required"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
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

  const classes = useStyles();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(headOfDepartmentSchema),
  });

  const submitForm = (inputData) => {
    delete inputData.password2;

    postData(url, requestHeaderWithBodyBeforeAuthentication(inputData))
    console.log(inputData);

    reset(); // reset the useForm state and values.
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`${classes.formStyle} ${classes.contentArea}`}
    >
      <CustomTextField
        label="Department Id"
        placeholder="Enter department Id"
        fullWidth
        {...register("departmentId")}
        inputError={errors.departmentId}
      />
      <CustomTextField
        label="Employee Id"
        placeholder="Enter your Employee Id"
        fullWidth
        {...register("empId")}
        inputError={errors.empId}
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
        placeholder="Enter your email"
        type="password"
        fullWidth
        {...register("password")}
        inputError={errors.password}
      />
      <CustomTextField
        label="Confirm Password"
        placeholder="Confirm your email"
        type="password"
        fullWidth
        {...register("password2")}
        inputError={errors.password2}
      />
      <CustomButton text="submit" type="submit" />
    </form>
  );
};

export default HeadOfDepartment;
