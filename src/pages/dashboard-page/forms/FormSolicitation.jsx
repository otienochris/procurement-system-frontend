import React, {useEffect, useState} from 'react'
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector} from "react-redux";
// import {fetchPO} from "./FormRequestForInformaton";
import {useStyles} from "../../signup-page";
import * as yup from "yup";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import {getAllPO} from "../../../services/purchase-order-service";
import {toast} from "react-toastify";
import {toastOptions} from "../../../App";



const schema = yup.object().shape({
    purchaseOrderId: yup.string().required(),
    message: yup.string().required(),
})

const FormSolicitation = (props) => {
    const {handleFormSubmit} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const classes = useStyles();

    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema),
    });

    const fetchData = async ()=> {
        setIsLoading(true)
        const apps = await getAllPO(token)
            .then(response => response)
            .then(response => response.json())
            .catch(() => {
                setIsLoading(false);
                toast.info("Oops! Could not connect to the server", toastOptions);
            });

        setPurchaseOrders(apps);
        if (apps.length !== 0){
            setSuccessfulFetch(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData().then();
    }, []);


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/>
            : successfulFetch ?
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>

                    <FormControl error={!!errors.purchaseOrderId} fullWidth={true}>
                        <InputLabel>Purchase Order</InputLabel>
                        <Select
                            native={true}
                            variant={"outlined"}
                            {...register("purchaseOrderId")}
                            error={!!errors.purchaseOrderId}
                        >
                            <option value={""}>{}</option>
                            {purchaseOrders.map(
                                purchaseOrder =>
                                    <option key={purchaseOrder.id} value={purchaseOrder.id}>
                                        {purchaseOrder.id}
                                    </option>
                            )}
                        </Select>
                        <FormHelperText>{errors.purchaseOrderId?.message}</FormHelperText>
                    </FormControl>
                    <CustomTextField
                        label={"Message/description"}
                        placeholder={"Provide a brief message to the potential suppliers regarding the purchase order"}
                        fullWidth
                        multiline

                        {...register("message")}
                    />

                    <Controller
                        render={
                            ({field: {onChange, value, name, }}) =>
                                (<DateTimePicker
                                    name={name}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    disablePast
                                    label={"deadline"}/>)}
                        name={"deadlineDate"}
                        control={control}
                    />
                    <CustomButton text={"Submit"} type={"submit"}/>
                </form>
            </MuiPickersUtilsProvider>

            : <h5>Error finding purchase orders</h5>
    )
}

export default FormSolicitation
