import React from 'react'
import {FormControl, FormHelperText} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector} from "react-redux";
import {savePurchaseRequisition} from "../../services/purchase-requisition-service";
import {useStyles} from "../signup-page";

const schema = yup.object().shape({
    acquisitionDocument: yup.mixed().required("Upload Acquisition Document "),
    needDocument: yup.mixed().required("Upload Need Document"),
    analysisDocument: yup.mixed().required("Upload Analysis Document"),
    emergencyDocument: yup.mixed().required("Upload Emergency Document"),
})

const FormPurchaseRequisition = (props) => {
    const {handleFormSubmit} = props
    const classes = useStyles();
    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })


    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleFormSubmit)}>
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
