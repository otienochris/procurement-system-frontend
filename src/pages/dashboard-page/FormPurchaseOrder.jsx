import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomButton from "../../components/customControls/CustomButton";
import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import {useStyles} from "../signup-page";
import {getAllPurchaseRequisitions} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";

const schema = yup.object().shape({
    rfpTemplate: yup.mixed().required("The field is required"),
    rfiTemplate: yup.mixed().required("The field is required"),
    purchaseRequisitionId: yup.string().required("Purchase Requisition is required"),
});


const FormPurchaseOrder = (props) => {
    const {handleFormSubmit} = props;
    const token = useSelector(state => state.token);
    const [purchaseRequisitions, setPurchaseRequisitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successfulFetch, setSuccessfulFetch] = useState(false);


    const classes = useStyles();
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const fetchData = async () => {
        setIsLoading(true)
        const pr = await getAllPurchaseRequisitions(token)
            .then(response => {
                return response;
            })
            .then(response => response.json()).catch(errors => {
                setIsLoading(false)
            });
        if (pr.length !== 0){
            setSuccessfulFetch(true)
        }
        setPurchaseRequisitions(pr);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData().then();
    }, [])

    return (
        isLoading ? <CircularProgress style={{margin: "12vh auto"}}/> : successfulFetch ?
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.contentArea}>
            <FormControl fullWidth={true} error={!!errors.purchaseRequisitionId}>
                <InputLabel>Purchase Requisition</InputLabel>
                <Select native={true}
                        variant={"outlined"} {...register("purchaseRequisitionId")}>
                    <option value={""}>{}</option>
                    {purchaseRequisitions.map(item => <option key={item.id} value={item.id}>{item.description.slice(0)}</option>)}
                </Select>
                <FormHelperText>{errors.purchaseRequisitionId?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth={true}>
                <h6>Request for Quotation</h6>
                <input
                    required
                    type="file"
                    accept={"application/pdf"}
                    {...register("rfpTemplate")}
                />
                <FormHelperText>{errors.rfpTemplate?.message}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.rfiTemplate} fullWidth>
                <h6>Request for Information</h6>
                <input
                    required
                    type="file"
                    accept={"application/pdf"}
                    {...register("rfiTemplate")}
                />
                <FormHelperText>{errors.rfiTemplate?.message}</FormHelperText>
            </FormControl>

            <CustomButton text="submit" type="submit"/>
        </form> : <h6>Sorry, could not find any purchase requisition to link to a purchase order</h6>
    );
};

export default FormPurchaseOrder;
