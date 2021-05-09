import React, { useState } from "react";
import CustomButton from "../../components/customControls/CustomButton";
import CustomTextField from "../../components/customControls/CustomTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useStyles } from "./EmployeeSignupForm";
import { requestHeader } from "./index";
import { TrainRounded } from "@material-ui/icons";
import { requestHeaderWithBodyBeforeAuthentication, suppliersDomainUrl } from "../../components/requestHeaders";

// const url = "http://192.168.137.1:8080/api/v1/suppliers/signup";
const approveUrl = "https://api.appruve.co/v1/verifications/ke/kra";
const testKraValidationToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4YmFhM2RkNS04NTkxLTQzZDYtYjY1MC1kOTExNzdkNGYxMDciLCJhdWQiOiI5NGNmMTYyMS0wYTUwLTRlZTctYjc0Zi1mNDkwNjVkMjNkMTkiLCJzdWIiOiIxYWQwY2FiYS0zMDBjLTRjNjItODQxNy03NmJmYWVhM2I5YzEiLCJuYmYiOjAsInNjb3BlcyI6WyJ2ZXJpZmljYXRpb25fdmlldyIsInZlcmlmaWNhdGlvbl9saXN0IiwidmVyaWZpY2F0aW9uX2RvY3VtZW50IiwidmVyaWZpY2F0aW9uX2lkZW50aXR5Il0sImV4cCI6MTYyMDUzNjg1MCwiaWF0IjoxNjE3OTQ0ODUwfQ.sOi46uzz9iL54b4CPanxVmx3SraS--to_TEIE2A-em4";

function SupplierSignUp(props) {
  const classes = useStyles();
  const [kraPin, setKraPin] = useState({});
  const [isKraValid, setIsKraValid] = useState(true);
  const { postData } = props;

  const companySchema = yup.object().shape({
    kRA: yup
      .string()
      // .matches(
      //   /[A-Z]\d{9}\w{1,}/,
      //   "please enter a valid KRA pin e.g A123456789B"
      // )
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

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(companySchema),
  });

  const verifyKra = async (kpin) => {
    console.log({ pin: kpin });
    const response = await fetch(approveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: testKraValidationToken,
      },
      body: JSON.stringify({ pin: kpin }),
    });
    if (response.ok) {
      setIsKraValid(true);
    }
  };

  const onSubmit = (data) => {
    delete data.password2; // we don't need the confirmed password

    // todo verifyKra(data.kRA);

    postData(suppliersDomainUrl, requestHeaderWithBodyBeforeAuthentication(data));
    // if (isKraValid) {
    // }
    reset()
    console.log(data);
  };

  return (
    <form
      className={`${classes.formStyle} ${classes.contentArea}`}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {...register("kRA")}
        inputError={errors.kRA || (!isKraValid ? "invalid kra": null)}
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
      <CustomTextField
        label="Description"
        placeholder="Provide a brief description of the company including your location and mode of operation"
        fullWidth
        multiline
        {...register("description")}
        inputError={errors.description}
      />
      <CustomButton text="submit" type="submit" />
    </form>
  );
}

export default SupplierSignUp;
