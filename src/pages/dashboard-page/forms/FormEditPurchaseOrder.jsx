import React, {useEffect, useState} from "react";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import * as yup from "yup";
import {useSelector} from "react-redux";
import {useStyles} from "../../signup-page";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {getAllPurchaseRequisitions} from "../../../services/purchase-requisition-service";
import {toast} from "react-toastify";
import {toastOptions} from "../../../App";

const schema = yup.object().shape({
    rfpTemplate: yup.mixed(),
    rfiTemplate: yup.mixed(),
    termsAndConditions: yup.mixed(),
    purchaseRequisitionId: yup.string().required("Purchase Requisition is required"),
    description: yup.string().required("Description is required")
});

const FormEditPurchaseOrder = (props) => {
    const {handleEditSubmit, defaultValues} = props;
    const token = useSelector(state => state.token);
    const [purchaseRequisitions, setPurchaseRequisitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);


    const classes = useStyles();
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const fetchData = async () => {
        setIsLoading(true)
        const pr = await getAllPurchaseRequisitions(token)
            .then(response => response)
            .then(response => response.json())
            .catch(() => {
                setIsLoading(false);
                toast.info("Oops! Could not connect to the server", toastOptions);
            });

        setPurchaseRequisitions(pr);
        if (pr.length !== 0) {
            setSuccessfulFetch(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData().then();
    }, [])

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
            <form onSubmit={handleSubmit(handleEditSubmit)} className={classes.contentArea}>
                <Controller render={({field: {value, onChange}}) => (
                    <FormControl fullWidth={true} error={!!errors.purchaseRequisitionId}>
                        <InputLabel>Purchase Requisition</InputLabel>
                        <Select
                            native={true}
                            variant={"outlined"}
                            value={value}
                            onChange={onChange}
                        >
                            <option value={""}>{}</option>
                            {purchaseRequisitions.map(item =>
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.description.slice(0, 20)}
                                </option>)}
                        </Select>
                        <FormHelperText>{errors.purchaseRequisitionId?.message}</FormHelperText>
                    </FormControl>
                )} name={"purchaseRequisitionId"} defaultValue={defaultValues.purchaseRequisitionId} control={control}/>

                <Controller render={({field: {value, onChange}}) => (
                    <CustomTextField
                        label="Description"
                        placeholder="Provide a brief description of the items, urgency and apparent need"
                        fullWidth
                        multiline
                        value={value}
                        onChange={onChange}
                        inputError={errors.description}
                    />
                )} name={"description"} defaultValue={defaultValues.description} control={control} />

                <FormControl fullWidth={true}>
                    <h6>Request for Quotation</h6>
                    <input
                        type="file"
                        accept={"application/pdf"}
                        {...register("rfpTemplate")}
                    />
                    <FormHelperText>{errors.rfpTemplate?.message}</FormHelperText>
                </FormControl>
                <FormControl error={!!errors.rfiTemplate} fullWidth>
                    <h6>Request for Information</h6>
                    <input
                        type="file"
                        accept={"application/pdf"}
                        {...register("rfiTemplate")}
                    />
                    <FormHelperText>{errors.rfiTemplate?.message}</FormHelperText>
                </FormControl>
                <FormControl error={!!errors.termsAndConditions} fullWidth>
                    <h6>Terms and Conditions</h6>
                    <input
                        type="file"
                        accept={"application/pdf"}
                        {...register("termsAndConditions")}
                    />
                    <FormHelperText>{errors.termsAndConditions?.termsAndConditions}</FormHelperText>
                </FormControl>

                <CustomButton text="submit" type="submit"/>
            </form> : <h6>Sorry, could not find any purchase requisition to link to a purchase order</h6>
    )
}

export default FormEditPurchaseOrder