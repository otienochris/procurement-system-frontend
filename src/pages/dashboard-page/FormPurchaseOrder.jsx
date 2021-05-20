import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector} from "react-redux";
import CustomButton from "../../components/customControls/CustomButton";
import {FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {useStyles} from "../signup-page/EmployeeSignupForm";
import {savePO} from "../../services/purchase-order-service";

const schema = yup.object().shape({
    rfpTemplate: yup.mixed().required("The field is required"),
    rfiTemplate: yup.mixed().required("The field is required"),
    status: yup.string().required("status is required"),
});

const postData = async (body, token) => {
    await savePO(token, body)
        .then(resp => resp.ok ? alert("Purchase Order added successfully  ") : alert("Error saving the purchase Order"))
  };

const FormPurchaseOrder = () => {
    const token = useSelector((state) => state.token);
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const submitForm = (data) => {
        const formData = new FormData();
        formData.append("rfpTemplate", data.rfpTemplate[0]);
        formData.append("rfiTemplate", data.rfiTemplate[0]);
        formData.append("status", data.status);
        postData(formData, token);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className={classes.contentArea}>
            <FormControl fullWidth={true}>
                <h6>Request for Quotation</h6>
                <input
                    required
                    type="file"
                    accept={"application/pdf"}
                    {...register("rfpTemplate")}
                />
                <FormHelperText>{errors.rfpTemplate?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.rfiTemplate}>
                <h6>Request for Information</h6>
                <input
                    required
                    type="file"
                    accept={"application/pdf"}
                    {...register("rfiTemplate")}
                />
                <FormHelperText>{errors.rfiTemplate?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputLabel>Status</InputLabel>
                <Select native={true} error={!!errors.status}
                        variant={"outlined"} {...register("status")}>
                    <option value={""}>{}</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="CANCELLED">Cancelled</option>
                </Select>
                <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
            <CustomButton text="submit" type="submit"/>
        </form>
    );
};

export default FormPurchaseOrder;