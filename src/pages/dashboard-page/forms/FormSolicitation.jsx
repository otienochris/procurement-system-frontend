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

export const fetchPOs = async (
    setPoForSolicitation,
    setPoForContract,
    setPoForOrderManagement,
    setIsLoading,
    setSuccessfulFetch,
    solicitations,
    contracts,
    orderManagement,
    token)=> {
    setIsLoading(true)
    let pos = [];
    pos = await getAllPO(token)
        .then(response => response)
        .then(response => response.json())
        .catch(() => {
            setIsLoading(false);
            toast.info("Oops! Could not connect to the server", toastOptions);
        });

    let validIds = [];
    let allIds = pos.map(item => item.id);

    if (setPoForSolicitation !== null){
        // for solicitation
        let invalidIds = solicitations.map(item => item.purchaseOrderId)
        validIds = allIds.filter(item => !invalidIds.includes(item));
        setPoForSolicitation(validIds);
    }

    if (setPoForContract !== null){
        // for contracts
        let badIds = contracts.map(item => item.purchaseOrderId);
        validIds = allIds.filter(item => !badIds.includes(item));
        setPoForContract(validIds);
    }

    if (setPoForOrderManagement !== null){
        // for order management
        let spoiledIds = orderManagement.map(item => item.purchaseOrderId);
        validIds = allIds.filter(item => !spoiledIds.includes(item));
        setPoForOrderManagement(validIds)
    }

    if (validIds.length !== 0 && setSuccessfulFetch !== null){
        setSuccessfulFetch(true)
    }
    setIsLoading(false)
    return pos;
}

const FormSolicitation = (props) => {
    const {handleFormSubmit, solicitations} = props;
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

    useEffect(() => {
        fetchPOs(setPurchaseOrders, null, null, setIsLoading, setSuccessfulFetch, solicitations,
            null, null, token).then()
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
                                id =>
                                    <option key={id} value={id}>
                                        {id}
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
