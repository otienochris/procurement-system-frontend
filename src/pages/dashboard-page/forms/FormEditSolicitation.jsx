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
import {fetchPOs} from "./FormSolicitation";


const schema = yup.object().shape({
    purchaseOrderId: yup.string().required(),
    message: yup.string().required(),
})

const FormEditSolicitation = (props) => {
    const {handleEditSubmit, defaultValues, solicitations} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const classes = useStyles();

    const { handleSubmit, formState: {errors}, control} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        // fetchPOs(setPurchaseOrders,setIsLoading, setSuccessfulFetch, token).then();
        fetchPOs(setPurchaseOrders,null, null, setIsLoading, null,
            solicitations, null, null, token).then();

    }, []);


    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/>
            :
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={handleSubmit(handleEditSubmit)} className={classes.contentArea}>

                    <Controller render={({field:{value, onChange}})=>(
                        <FormControl error={!!errors.purchaseOrderId} fullWidth={true}>
                            <InputLabel>Purchase Order</InputLabel>
                            <Select
                                native={true}
                                variant={"outlined"}
                                value={value}
                                onChange={onChange}
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
                    )} name={"purchaseOrderId"} control={control} defaultValue={defaultValues.purchaseOrderId} />

                    <Controller render={({field:{value, onChange}})=>(
                        <CustomTextField
                            label={"Message/description"}
                            placeholder={"Provide a brief message to the potential suppliers regarding the purchase order"}
                            fullWidth
                            multiline
                            value={value}
                            onChange={onChange}
                        />
                    )} name={"message"} control={control} defaultValue={defaultValues.message} />


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
                        defaultValue={defaultValues.deadlineDate}
                    />
                    <CustomButton text={"Submit"} type={"submit"}/>
                </form>
            </MuiPickersUtilsProvider>
    )
}

export default FormEditSolicitation
