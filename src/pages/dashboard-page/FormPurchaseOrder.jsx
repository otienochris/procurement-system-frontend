import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomButton from "../../components/customControls/CustomButton";
import CustomTextField from "../../components/customControls/CustomTextField";
import { purchaseOrderDomainUrl } from "../../components/requestHeaders";

const schema = yup.object().shape({
  rfpTemplate: yup.mixed().required("The field is required"),
  rfiTemplate: yup.mixed().required("The field is required"),
  status: yup.string().required(),
});

const FormPurchaseOrder = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const token = useSelector((state) => state.token);

  const postData = async (formData) => {
    const response = await fetch(purchaseOrderDomainUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        // "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
  };

  const submitForm = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("rfpTemplate", data.rfpTemplate[0]);
    formData.append("rfiTemplate", data.rfiTemplate[0]);
    formData.append("status", data.status);
    console.log(formData.values);
    postData(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input
        type="file"
        {...register("rfpTemplate")}
      />
      <input
        type="file"
        {...register("rfiTemplate")}
      />
      <CustomTextField label="Status" type="text" {...register("status")} />
      <CustomButton text="submit" type="submit" />
    </form>
  );
};

export default FormPurchaseOrder;
