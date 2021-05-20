import React, {useEffect, useState} from 'react'
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useStyles} from "../signup-page/EmployeeSignupForm";
import {FormControl, InputLabel, Select, FormHelperText} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import {getAllPO} from "../../services/purchase-order-service";
import {useSelector} from "react-redux";
import {saveRFI} from "../../services/request-for-information-service";

const schema = yup.object().shape({
    purchaseOrderId: yup.string().required("Purchase Order Id is required"),
    rfi: yup.mixed().required("Please upload a Request For Information file")
})


const FormRequestForInformation = () => {
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([])

    const fetchData = async (type, body) => {
        switch (type){
            case "getAllPO":
                const po = await getAllPO(token).then(resp => resp).then(resp => resp.json());
                setPurchaseOrders(po);
                console.log(purchaseOrders)
                break
            case "saveRFI":
                await saveRFI(body, token)
                    .then(response => response.ok ? alert("Request For information added successfully"): alert("Error adding Request For information"))
                    .then()
                break;
            default:
                break;

        }

    }

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        criteriaMode: "all"
    })

    const handleOnSubmit = (data) => {
        const formData = new FormData()
        formData.append("purchaseOrderId", data.purchaseOrderId)
        formData.append("rfi", data.rfi[0])

        fetchData("saveRFI",formData).then()
        reset()
    }

    useEffect(()=> {
        fetchData("getAllPO").then()
    }, [])

    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleOnSubmit)}>
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
            <CustomButton text={"Submit"} type={"submit"} />
        </form>
    )
}

export default FormRequestForInformation
