import React, {useEffect} from 'react'
import {FormControl, FormHelperText} from "@material-ui/core";
import CustomButton from "../../../components/customControls/CustomButton";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useStyles} from "../../signup-page";
import CustomTextField from "../../../components/customControls/CustomTextField";

const schema = yup.object().shape({
    acquisitionDocument: yup.mixed().required(),
    needDocument: yup.mixed().required(),
    analysisDocument: yup.mixed().required(),
    emergencyDocument: yup.mixed().required(),
    description: yup.string().required(),
    departmentId: yup.string().required()
})

const FormPurchaseRequisition = (props) => {
    const {handleFormSubmit, defaultValues} = props;

    const classes = useStyles();
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all",
        defaultValues
    });

    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleFormSubmit)}>

            <CustomTextField
                label="Department Id"
                placeholder="Enter our department id"
                fullWidth
                {...register("departmentId")}
                inputError={errors.departmentId}
            />
            <CustomTextField
                label="Description"
                placeholder="Provide a brief description of the need, emergency and items needed"
                fullWidth
                multiline
                {...register("description")}
                inputError={errors.description}
            />
            <FormControl error={!!errors.acquisitionDocument} fullWidth>
                <h6>Acquisition Document</h6>
                <input
                    type={"file"}
                    accept={"application/pdf"}
                    {...register("acquisitionDocument")}
                />
                <FormHelperText>
                    {errors.acquisitionDocument?.message}
                </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.analysisDocument}>
                <h6>Analysis Document</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("analysisDocument")}
                />
                <FormHelperText>
                    {errors.analysisDocument?.message}
                </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.emergencyDocument}>
                <h6>Emergency Document</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("emergencyDocument")} />
                <FormHelperText>
                    {errors.emergencyDocument?.message}
                </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.needDocument}>
                <h6>Need Document</h6>
                <input
                    type="file"
                    accept={"application/pdf"}
                    {...register("needDocument")} />
                <FormHelperText>{errors.needDocument?.message}</FormHelperText>
            </FormControl>
            <CustomButton text={"Submit"} type={"submit"}/>
        </form>
    )
}

export default FormPurchaseRequisition
