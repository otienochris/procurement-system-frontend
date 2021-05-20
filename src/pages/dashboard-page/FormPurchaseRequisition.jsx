import React, {useState} from 'react'
import {Divider, FormControl, FormHelperText} from "@material-ui/core";
import {useStyles} from "../signup-page/EmployeeSignupForm";
import CustomButton from "../../components/customControls/CustomButton";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector} from "react-redux";
import {savePurchaseRequisition} from "../../services/purchase-requisition-service";

const schema = yup.object().shape({
    acquisitionDocument: yup.mixed().required("Upload Acquisition Document "),
    needDocument: yup.mixed().required("Upload Need Document"),
    analysisDocument: yup.mixed().required("Upload Analysis Document"),
    emergencyDocument: yup.mixed().required("Upload Emergency Document"),
})

const FormPurchaseRequisition = () => {
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })

    const fetchData = async (type, body) => {
        switch (type){
            case "savePurchaseRequisition":
                await savePurchaseRequisition(token, body).then(resp =>
                    resp.ok ? alert("Purchase Requisition added successfully"): alert("error adding purchase requisition"))
                    .then()
                break
            default:
                break
        }
    }

    const handleOnSubmit = (data) => {
        console.log(data.acquisitionDocument[0])
        console.log(data.needDocument[0])
        console.log(data.analysisDocument[0])
        console.log(data.emergencyDocument[0])

        const formData = new FormData();
        formData.append("acquisitionDocument", data.acquisitionDocument[0]);
        formData.append("needDocument", data.needDocument[0]);
        formData.append("analysisDocument", data.analysisDocument[0]);
        formData.append("emergencyDocument", data.emergencyDocument[0]);
        fetchData("savePurchaseRequisition", formData).then()

        reset()
    }

    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleOnSubmit)}>
            <FormControl error={!!errors.acquisitionDocument}>
                <h6>Acquisition Document</h6>
                <input required type={"file"} accept={"application/pdf"} {...register("acquisitionDocument")}  />
                <FormHelperText>{errors.acquisitionDocument?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.analysisDocument}>
                <h6>Analysis Document</h6>
                <input required type="file" accept={"application/pdf"} {...register("analysisDocument")} />
                <FormHelperText>{errors.analysisDocument?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.emergencyDocument}>
                <h6>Emergency Document</h6>
                <input required={true} type="file" accept={"application/pdf"} {...register("emergencyDocument")} />
                <FormHelperText>{errors.emergencyDocument?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.needDocument}>
                <h6>Need Document</h6>
                <input required={true} type="file" accept={"application/pdf"} {...register("needDocument")} />
                <FormHelperText>{errors.needDocument?.message}</FormHelperText>
            </FormControl>
            <CustomButton text={"Submit"} type={"submit"}/>
        </form>
    )
}

export default FormPurchaseRequisition
