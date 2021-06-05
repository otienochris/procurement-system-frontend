import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useStyles} from "../../signup-page";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {getAllSuppliers} from "../../../services/users/supplier-service";
import CustomButton from "../../../components/customControls/CustomButton";
import {getAllPO} from "../../../services/purchase-order-service";

const schema = yup.object().shape({
    supplierId: yup.string().required(),
    contractDocument: yup.mixed().required(),
    purchaseOrderId: yup.string().required()
})

export const fetchData = async (setSuppliers, setPOs, setIsLoading, setSuccessfulFetch, token) => {
    setIsLoading(true);
    let suppliersDB = [];
    let purchaseOrdersDB = []
    suppliersDB = await getAllSuppliers(token)
        .then(response => response)
        .then(result => result.json())
        .catch();
    purchaseOrdersDB = await getAllPO(token)
        .then(response => response)
        .then(result => result.json())
        .catch();
    setSuppliers(suppliersDB);
    setPOs(purchaseOrdersDB);
    if (suppliersDB.length !== 0 && purchaseOrdersDB.length !== 0) {
        setSuccessfulFetch(true);
    }
    setIsLoading(false);
};

const FormAddContract = (props) => {
    const {handleFormSubmit} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);
    const [suppliers, setSuppliers] = useState([{}]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const {handleSubmit, control, register, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const classes = useStyles();

    useEffect(() => {
        fetchData(setSuppliers, setPurchaseOrders, setIsLoading, setSuccessfulFetch, token).then();
    }, []);

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/>
            : successfulFetch ?
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
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
                <FormControl fullWidth={true}>
                    <h6>Contract Document</h6>
                    <input
                        required
                        type="file"
                        accept={"application/pdf"}
                        {...register("contractDocument")}
                    />
                    <FormHelperText>{errors.contractDocument?.message}</FormHelperText>
                </FormControl>

                <CustomButton type={"submit"} text={"Submit"} />
            </form>
            : <h5>Error finding either free suppliers or open purchase order</h5>
    )
}

export default FormAddContract;