import React, {useEffect, useState} from 'react'
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import {getAllPO} from "../../services/purchase-order-service";
import {useSelector} from "react-redux";
import {useStyles} from "../signup-page";

const schema = yup.object().shape({
    purchaseOrderId: yup.string().required("Purchase Order Id is required"),
    rfi: yup.mixed().required("Please upload a Request For Information file")
})

export const fetchPO = async (setIsLoading, setSuccessfulFetch, setPurchaseOrders, token) => {
    setIsLoading(true)
    const po = await getAllPO(token)
        .then(resp => resp)
        .then(resp => resp.json())
        .catch(err => setIsLoading(false));
    if (po.length !== 0){
        setSuccessfulFetch(true)
    }
    setPurchaseOrders(po);
    setIsLoading(false)
}

const FormRequestForInformation = (props) => {
    const {handleFormSubmit} = props
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);



    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        criteriaMode: "all"
    })

    useEffect(() => {
        fetchPO(setIsLoading, setSuccessfulFetch,setPurchaseOrders, token).then()
    }, [])

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
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
                // todo add accept
                <input type="file" {...register("rfi")} />
                <FormHelperText>{errors.rfi?.message}</FormHelperText>
            </FormControl>
            <CustomButton text={"Submit"} type={"submit"}/>
        </form> : <h5>Sorry, could not find any purchase order</h5>
    )
}

export default FormRequestForInformation
