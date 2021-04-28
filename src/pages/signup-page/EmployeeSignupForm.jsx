import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/customControls/CustomTextField";
import CustomButton from "../../components/customControls/CustomButton";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  },
}));

function EmployeeSignupForm() {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .min(6, "name must be at least 5 characters")
      .max(50, "name cannot exceed 8 characters")
      .required("name cannot be empty"),
    employmentId: yup
      .string()
      .matches(/^[A-Z]\d{2}\/\d{5}\/\d{2}$/, "enter a valid employment id")
      .required(),
    email: yup.string().email("enter a valid email").required(),
    position: yup.string().required(),
    password: yup
      .string()
      .min(8, "password must be between 8 and 12")
      .max(12, "password must be between 8 and 12")
      .required("password cannot be empty"),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "passwords do no match")
      .required("please match the password above"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className={`${classes.contentArea} ${classes.formStyle}`}>
      <CustomTextField
        label="full name"
        placeholder="please enter your full name"
        fullWidth
        {...register("fullName")}
        inputError={errors.fullName}
      />
      <CustomTextField
        label="Employee Id"
        placeholder="Please enter your employee id"
        fullWidth
        {...register("employmentId")}
        inputError={errors.employmentId}
      />
      <FormControl fullWidth>
        <InputLabel className={classes.inputLable}>Position</InputLabel>
        <Select
          native
          variant="outlined"
          {...register("position")}
          error={errors.position ? true : false}
        >
          <option value="PROCUREMENT_OFFICER">Procurement officer</option>
          <option value="INVENTORY_MANAGER">Inventory Manager</option>
          <option value="FINANCE">Finance</option>
          <option value="INTERN">Intern</option>
          <option value="HUMAN_RESOURCE_MANAGER">Human Resource Manager</option>
          <option value="PROCUREMENT_MANAGER">Procurement Manager</option>
          <option value="STORES_MANAGER">Stores Manager</option>
          <option value="PURCHASING_ASSISTANT">Purchasing Assistant</option>
          <option value="ICT_MANAGEER">ICT Manager</option>
          <option value="" selected></option>
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
