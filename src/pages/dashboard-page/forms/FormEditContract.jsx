import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useStyles} from "../../signup-page";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomButton from "../../../components/customControls/CustomButton";
import {fetchData} from "./FormAddContract";

const schema = yup.object().shape({
    supplierId: yup.string().required(),
    contractDocument: yup.mixed(),
    purchaseOrderId: yup.string().required()
})


const FormEditContract = (props) => {
    const {handleEditSubmit, defaultValues, contracts, solicitation} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const {handleSubmit, control, register, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const classes = useStyles();

    useEffect(() => {
        fetchData(setSuppliers, setPurchaseOrders, setIsLoading, null, token,contracts,null, solicitation).then();
        console.log(defaultValues);
    }, []);

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/>
            :
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
                                kra =>
                                    <option key={kra} value={kra}>
                                        {kra}
                                    </option>
                            )}
                        </Select>
                        <FormHelperText>{errors.supplierId?.message}</FormHelperText>
                    </FormControl>
                )} name={"supplierId"} control={control} defaultValue={defaultValues.supplierId} />

                <Controller render={({field:{value, onChange}}) => (
                    <FormControl error={!!errors.purchaseOrderId} fullWidth>
                        <InputLabel>Purchase Order</InputLabel>
                        <Select
                            native
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


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                        render={({field: {value, name, onChange}}) =>
                            (
                                <DateTimePicker
                                    name={name}
                                    onChange={onChange}
                                    value={value}
                                    disablePast
                                    label={"Expiry Date"}
                                    fullWidth
                                />)}
                        name={"expiryDate"}
                        control={control}
                        defaultValue={defaultValues.expiryDate}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
                <FormControl fullWidth={true}>
                    <h6>Contract Document</h6>
                    <input
                        type="file"
                        accept={"application/pdf"}
                        {...register("contractDocument")}
                    />
                    <FormHelperText>{errors.contractDocument?.message}</FormHelperText>
                </FormControl>

                <CustomButton type={"submit"} text={"Submit"} />
            </form>
    )
}

export default FormEditContract;