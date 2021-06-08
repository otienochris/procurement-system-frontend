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

export const fetchData = async (setSuppliers, setPOs, setIsLoading, setSuccessfulFetch, token, contracts, applications, solicitations) => {
    setIsLoading(true);
    let purchaseOrdersDB = []
    let suppliersDB = [];
    if (setSuppliers !== null) {
        suppliersDB = await getAllSuppliers(token)
            .then(response => response)
            .then(result => result.json())
            .catch();
        let validSuppliers = suppliersDB.filter(item => item.isAccountActive)
        setSuppliers(validSuppliers.map(item => item.kra));
    }
    if (setPOs !== null) {
        purchaseOrdersDB = await getAllPO(token)
            .then(response => response)
            .then(result => result.json())
            .catch();
    }

    let allIds = purchaseOrdersDB.filter(item => item.status === "PENDING").map(item => item.id);
    let invalidIds = [];
    let validIds = [];

    validIds = allIds; // assume all ids are valid before filtering

    // filters 1) filter by contract: get id not linked to a contract
    if (contracts != null) {
        invalidIds = contracts.map(item => item.purchaseOrderId);
        validIds = allIds.filter(item => !invalidIds.includes(item));
        setPOs(validIds);
    }

    // 2) filter by applications : get ids not linked to an application
    if (applications != null) {
        invalidIds = applications.map(item => item.purchaseOrderId);
        validIds = allIds.filter(item => !invalidIds.includes(item))
        setPOs(validIds);
    }

    // 3) filter by solicitations : get ids linked to a particular solicitation
    let validSolicitations = [];
    if (solicitations !== null) {
        if (solicitations.length !== 0) {
            validSolicitations = solicitations.filter(item => {
                return new Date(item.deadline).getTime() > new Date().getTime(); // ensure solicitation is not expired
            });
        }
        validIds = validSolicitations.map(item => item.purchaseOrderId);
        setPOs(validIds)
    }

    if (suppliersDB.length !== 0 && validIds.length !== 0 && setSuccessfulFetch !== null) {
        setSuccessfulFetch(true);
    }
    setIsLoading(false);
};

const FormAddContract = (props) => {
    const {handleFormSubmit, contracts, applications} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const {handleSubmit, control, getValues, register, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const classes = useStyles();

    useEffect(() => {
        // fetchData(setSuppliers, setPurchaseOrders, setIsLoading, setSuccessfulFetch, token, contracts, null, null).then();
        fetchData(setSuppliers, setPurchaseOrders, setIsLoading, setSuccessfulFetch, token, null, null, null).then();
        console.log(applications);
        console.log(suppliers);
    }, []);

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/>
            : successfulFetch ?
            <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>
                <Controller render={({field: {value, onChange}}) => (
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
                            {suppliers
                                .filter(item => applications.map(item => item.supplierId).includes(item))
                                .map(
                                kra =>
                                    <option key={kra} value={kra}>
                                        {kra}
                                    </option>
                            )}
                        </Select>
                        <FormHelperText>{errors.supplierId?.message}</FormHelperText>
                    </FormControl>
                )} name={"supplierId"} control={control}/>

                <Controller render={({field: {value, onChange}}) => (
                    <FormControl error={!!errors.purchaseOrderId} fullWidth={true}>
                        <InputLabel>Purchase Order</InputLabel>
                        <Select
                            native={true}
                            variant={"outlined"}
                            // value={value}
                            value={value}
                            onChange={onChange}
                        >
                            <option value={""}>{}</option>
                            {/*only display the contract the supplier was awarded*/}
                            {applications
                                .filter(item => item.supplierId === getValues("supplierId"))
                                .map(item =>
                                    <option key={item.purchaseOrderId} value={item.purchaseOrderId}>
                                        {item.purchaseOrderId}
                                    </option>)
                            }
                        </Select>
                        <FormHelperText>{errors.purchaseOrderId?.message}</FormHelperText>
                    </FormControl>
                )} name={"purchaseOrderId"} control={control} defaultValue={applications
                    .filter(item => item.supplierId === getValues("supplierId"))
                    .map(item => item.purchaseOrderId)}/>


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

                <CustomButton type={"submit"} text={"Submit"}/>
            </form>
            : <h5>Error finding either free suppliers or open purchase order</h5>
    )
}

export default FormAddContract;