import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/customControls/CustomTextField";
import CustomButton from "../../components/customControls/CustomButton";
import { requestHeader } from "./index";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";

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
  error: {
    color: "red",
  },
  inputLable: {
    marginLeft: theme.spacing(1.5),
  },
  formStyle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    maxWidth: "60%",
    minHeight: "80%",
  },
}));

const url = "http://192.168.137.1:8080/api/v1/employees/";

function EmployeeSignupForm(props) {
  const { postData } = props;
  const classes = useStyles();
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
        "password must be of legth 8+, contain letters, numbers and symbols"
      )
      .required("password cannot be empty"),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "passwords do no match")
      .required("please match the password above"),
  });

  const {
    register,
    unregister,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const submitForm = (data) => {
    delete data.password2;
    console.log(data);
    postData(url, requestHeader(data));
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`${classes.contentArea} ${classes.formStyle}`}
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
        <InputLabel className={classes.inputLable}>Position</InputLabel>
        <Select
          native
          variant="outlined"
          {...register("position")}
          error={errors.position ? true : false}
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
          <option value="ICT_MANAGEER">ICT Manager</option>
          
        </Select>
        <FormHelperText className={`${classes.error} ${classes.inputLable}`}>
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

export default EmployeeSignupForm;
