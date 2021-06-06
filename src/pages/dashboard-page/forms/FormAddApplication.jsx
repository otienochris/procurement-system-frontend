import React, {useEffect, useState} from 'react'
import {useForm, Controller} from "react-hook-form";
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
    const {handleFormSubmit, applications, solicitations} = props;
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);

    const {register, handleSubmit, control, getValues, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })

    useEffect(() => {
        fetchData(setSuppliers, setPurchaseOrders, setIsLoading, setSuccessfulFetch, token, null, applications, solicitations)
            .then();
        console.log(applications)
    }, [])


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
            <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>
                <Controller render={({field:{value, onChange}})=>(
                    <FormControl error={!!errors.supplierId} fullWidth={true}>
                        <InputLabel>Supplier...</InputLabel>
                        <Select
                            native={true}
                            variant={"outlined"}
                            value={value}
                            onChange={onChange}
                            error={!!errors.supplierId}
                        >
                            <option value={""}>{}</option>
                            {suppliers.map(
                                kra =>
                                    <option key={kra} value={kra}>
                                        {kra}
                                    </option>
                            )}
                        </Select>
                        <FormHelperText>{errors.supplierId?.message}</FormHelperText>
                    </FormControl>
                )} name={"supplierId"} control={control} />

                <FormControl fullWidth={true}>
                    <InputLabel>Purchase Order</InputLabel>
                    <Select native={true} {...register("purchaseOrderId")} error={!!errors.purchaseOrderId}>
                        <option value="">{}</option>
                        {/*ensure a supplier does not apply for the same purchase order*/}
                        {purchaseOrders.map( id => <option key={id} value={id}>{id}</option>)}
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
            </form> : <h5>Error, either
                <br/> 1. there are no open solicitations
                <br/> 2. there are no active suppliers
                <br/> 3. or there are no approved purchase orders</h5>
    )
}

export default FormAddApplication
