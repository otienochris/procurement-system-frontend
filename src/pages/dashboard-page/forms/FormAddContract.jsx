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

const schema = yup.object().shape({
    supplierId: yup.string().required(),
    status: yup.string().required(),
    contractDocument: yup.mixed().required()
})

const FormAddContract = (props) => {
    const {handleFormSubmit} = props;
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);
    const [suppliers, setSuppliers] = useState([{}]);

    const {handleSubmit, control, register, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const classes = useStyles();

    const fetchData = async () => {
        let supps = [];
        supps = await getAllSuppliers(token)
            .then(response => {
                return response
            })
            .then(result => result.json())
            .catch();
        setSuppliers(supps);
        if (supps !== 0) {
            setSuccessfulFetch(true)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData().then();
        setIsLoading(false);
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
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        native
                        {...register("status")}
                    >
                        <option value={""}>Choose...</option>
                        <option value={"IN_PROGRESS"}>In progress</option>
                        <option value={"CANCELLED"} >Cancelled</option>
                        <option value={"COMPLETED"}>completed</option>
                    </Select>
                </FormControl>
                <CustomButton type={"submit"} text={"Submit"} />
            </form>
            : <h5>Error finding suppliers</h5>
    )
}

export default FormAddContract;