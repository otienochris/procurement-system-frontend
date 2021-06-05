import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select, TextField} from "@material-ui/core";
import CustomButton from "../../../components/customControls/CustomButton";
import {useSelector} from "react-redux";
import {useStyles} from "../../signup-page";
import {fetchData} from "./FormAddContract";

const schema = yup.object().shape({
    purchaseOrderId: yup.string().required("Purchase Order Id is required"),
    supplierId: yup.string().required("Supplier Id is required"),
    quotationDocument: yup.mixed().required("Quotation Document is required"),
    message: yup.string().required("Description is required"),
    informationDocument: yup.mixed().required("T&C Document is required")
})

const FormAddApplication = (props) => {
    const {handleFormSubmit} = props;
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })

    useEffect(() => {
        fetchData(setSuppliers, setPurchaseOrders, setIsLoading, setSuccessfulFetch, token).then()
    }, [])


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
            <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>
                <FormControl error={!!errors.supplierId} fullWidth={true}>
                    <InputLabel>Supplier...</InputLabel>
                    <Select
                        native={true}
                        variant={"outlined"}
                        {...register("supplierId")}
                        error={!!errors.supplierId}
                    >
                        <option value={""}>{}</option>
                        {suppliers.map(
                            supplier =>
                                <option key={supplier.kra} value={supplier.kra}>
                                    {supplier.name}
                                </option>
                        )}
                    </Select>
                    <FormHelperText>{errors.supplierId?.message}</FormHelperText>
                </FormControl>
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
                <TextField label={"Message/Description"}
                           placeholder={"Brief message to the supplier of what you need, the kind of partnership and outcome you expect"}
                           {...register("message")} error={!!errors.message} variant={"outlined"}
                           helperText={errors.message?.message} multiline={true} fullWidth={true}/>
                <FormControl error={!!errors.quotationDocument} variant={"outlined"} fullWidth={true}>
                    <h6>Quotation Document*</h6>
                    <input type="file" accept={"application/pdf"} {...register("quotationDocument")}  />
                    <FormHelperText>{errors.quotationDocument?.message}</FormHelperText>
                </FormControl>
                <FormControl error={!!errors.informationDocument} fullWidth={true}>
                    <h6>Information Document*</h6>
                    <input type="file" accept={"application/pdf"} {...register("informationDocument")}/>
                    <FormHelperText>{errors.informationDocument?.message}</FormHelperText>
                </FormControl>
                <CustomButton text={"Submit"} type={"submit"}/>
            </form> : <h5>Error, either there are no free suppliers or purchase orders</h5>
    )
}

export default FormAddApplication
