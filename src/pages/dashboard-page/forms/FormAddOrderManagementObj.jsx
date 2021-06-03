import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector} from "react-redux";
import {useStyles} from "../../signup-page";
import {getAllPO} from "../../../services/purchase-order-service";
import {toast} from "react-toastify";
import {toastOptions} from "../../../App";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import CustomButton from "../../../components/customControls/CustomButton";


const schema = yup.object().shape({
    goodsReturnShipment: yup.mixed().required(),
    goodsReceivedNote: yup.mixed().required(),
    invoice: yup.mixed().required(),
    purchaseOrderId: yup.string().required("This field is required"),

})

const FormAddOrderManagementObj = (props) => {

    const {handleFormSubmit} = props
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const classes = useStyles();

    const {register, handleSubmit, formState: {errors}} = useForm({
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
            <FormControl error={!!errors.goodsReceivedNote}>
                <h6>Goods Received Note:</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("goodsReceivedNote")}
                />
                <FormHelperText>
                    {errors.goodsReceivedNote?.message}
                </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.goodsReturnShipment}>
                <h6>Goods Return Shipment:</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("goodsReturnShipment")}
                />
                <FormHelperText>
                    {errors.goodsReturnShipment?.message}
                </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.invoice}>
                <h6>Invoice:</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("invoice")}
                />
                <FormHelperText>
                    {errors.invoice?.message}
                </FormHelperText>
            </FormControl>
            <CustomButton text={"submit"} type={"submit"} />
        </form> : <h5>Error finding purchase orders</h5>
    )
}

export default FormAddOrderManagementObj;