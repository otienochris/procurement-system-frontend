import React, {useEffect, useState} from 'react'
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import {getAllPO} from "../../services/purchase-order-service";
import {useSelector} from "react-redux";
import {useStyles} from "../signup-page";

const schema = yup.object().shape({
    purchaseOrderId: yup.string().required("Purchase Order Id is required"),
    rfi: yup.mixed().required("Please upload a Request For Information file")
})


const FormRequestForInformation = (props) => {
    const {handleFormSubmit} = props
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([])

    const fetchPO = async () => {
        const po = await getAllPO(token).then(resp => resp).then(resp => resp.json());
        setPurchaseOrders(po);
    }

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        criteriaMode: "all"
    })

    useEffect(() => {
        fetchPO().then()
    }, [])

    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleFormSubmit)}>
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
            <FormControl error={!!errors.rfi} variant={"outlined"} fullWidth={true}>
                <h6>Request For Information Document*</h6>
                <input type="file" accept={"application/pdf"} {...register("rfi")} />
                <FormHelperText>{errors.rfi?.message}</FormHelperText>
            </FormControl>
            <CustomButton text={"Submit"} type={"submit"}/>
        </form>
    )
}

export default FormRequestForInformation
