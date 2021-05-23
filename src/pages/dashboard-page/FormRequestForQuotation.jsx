import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select, TextField} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import {useSelector} from "react-redux";
import {useStyles} from "../signup-page";
import {fetchPO} from "./FormRequestForInformaton";

const schema = yup.object().shape({
    purchaseOrderId: yup.string().required("Purchase Order Id is required"),
    quotationDocument: yup.mixed().required("Quotation Document is required"),
    message: yup.string().required("Description is required"),
    termsAndConditionsDocument: yup.mixed().required("T&C Document is required")
})

const FormRequestForQuotation = (props) => {
    const {handleFormSubmit} = props;
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })


    useEffect(() => {
        fetchPO(setIsLoading, setSuccessfulFetch, setPurchaseOrders, token).then()
    }, [])


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>
            <FormControl fullWidth={true}>
                <InputLabel>Purchase Order</InputLabel>
                <Select native={true} {...register("purchaseOrderId")} error={!!errors.purchaseOrderId}>
                    <option value="">{}</option>
                    {purchaseOrders.map(
                        purchaseOrder =>
                            <option key={purchaseOrder.id} value={purchaseOrder.id}>{purchaseOrder.id}</option>
                    )}
                </Select>
                <FormHelperText>{errors.purchaseOrderId?.message}</FormHelperText>
            </FormControl>
            <TextField label={"Description"} placeholder={"Brief description of the request for quotation"}
                       {...register("message")} error={!!errors.message} variant={"outlined"}
                       helperText={errors.message?.message} multiline={true} fullWidth={true}/>
            <FormControl error={!!errors.quotationDocument} variant={"outlined"} fullWidth={true}>
                <h6>Quotation Document*</h6>
                <input type="file" accept={"application/pdf"} {...register("quotationDocument")}  />
                <FormHelperText>{errors.quotationDocument?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.termsAndConditionsDocument} fullWidth={true}>
                <h6>Terms and Conditions Document*</h6>
                <input type="file" accept={"application/pdf"} {...register("termsAndConditionsDocument")}/>
                <FormHelperText>{errors.termsAndConditionsDocument?.message}</FormHelperText>
            </FormControl>
            <CustomButton text={"Submit"} type={"submit"}/>
        </form> : <h5>Error, could not find any purchase order</h5>
    )
}

export default FormRequestForQuotation
