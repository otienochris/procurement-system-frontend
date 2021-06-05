import React, {useEffect, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
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
    quotationDocument: yup.mixed(),
    message: yup.string().required("Description is required"),
    informationDocument: yup.mixed()
})

const FormEditApplication = (props) => {
    const {handleEditSubmit, defaultValues} = props;
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);

    const {handleSubmit, formState: {errors}, control} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all"
    })

    useEffect(() => {
        fetchData(setSuppliers,setPurchaseOrders, setIsLoading, setSuccessfulFetch, token).then()
    }, [])


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
            <form onSubmit={handleSubmit(handleEditSubmit)} className={classes.contentArea}>
                <Controller render={({field:{value, onChange}}) => (
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
                                supplier =>
                                    <option key={supplier.kra} value={supplier.kra}>
                                        {supplier.name}
                                    </option>
                            )}
                        </Select>
                        <FormHelperText>{errors.supplierId?.message}</FormHelperText>
                    </FormControl>
                )} name={"supplierId"} control={control} defaultValue={defaultValues.supplierId} />
                <Controller render={({field: {value, onChange}}) => (
                    <FormControl fullWidth={true}>
                        <InputLabel>Purchase Order</InputLabel>
                        <Select
                            native
                            error={!!errors.purchaseOrderId}
                            value={value}
                            onChange={onChange}
                        >
                            <option value="">{}</option>
                            {purchaseOrders.map(
                                purchaseOrder =>
                                    <option key={purchaseOrder.id} value={purchaseOrder.id}>{purchaseOrder.id}</option>
                            )}
                        </Select>
                        <FormHelperText>{errors.purchaseOrderId?.message}</FormHelperText>
                    </FormControl>
                )} name={"purchaseOrderId"} control={control} defaultValue={defaultValues.purchaseOrderId}/>

                <Controller render={({field: {value, onChange}}) => (
                    <TextField
                        label={"Message/Description"}
                        placeholder={"Brief message to the supplier of what you need, the kind of partnership and outcome you expect"}
                        error={!!errors.message}
                        variant={"outlined"}
                        value={value}
                        onChange={onChange}
                        helperText={errors.message?.message}
                        multiline={true} fullWidth
                    />
                )} name={"message"} control={control} defaultValue={defaultValues.message}/>

                <Controller render={({field: {value, onChange}})=> (
                    <FormControl error={!!errors.quotationDocument} variant={"outlined"} fullWidth={true}>
                        <h6>Quotation Document*</h6>
                        <input
                            type="file"
                            accept={"application/pdf"}
                        />
                        <FormHelperText>{errors.quotationDocument?.message}</FormHelperText>
                    </FormControl>
                )} name={"quotationDocument"} control={control} />

                <Controller render={({field: {value, onChange}}) => (
                    <FormControl error={!!errors.informationDocument} fullWidth={true}>
                        <h6>Information Document*</h6>
                        <input
                            type="file"
                            accept={"application/pdf"}
                        />
                        <FormHelperText>{errors.informationDocument?.message}</FormHelperText>
                    </FormControl>
                )} name={"informationDocument"} control={control}/>

                <CustomButton text={"Submit"} type={"submit"}/>
            </form> : <h5>Error, either the purchase order or supplier <br/> linked here no longer exists</h5>
    )
}

export default FormEditApplication
