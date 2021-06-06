import React from "react";
import CustomTextField from "../../../components/customControls/CustomTextField";
import {FormControl, FormHelperText} from "@material-ui/core";
import CustomButton from "../../../components/customControls/CustomButton";
import {useStyles} from "../../signup-page";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    acquisitionDocument: yup.mixed(),
    needDocument: yup.mixed(),
    analysisDocument: yup.mixed(),
    emergencyDocument: yup.mixed(),
    description: yup.string().required("Description is required"),
    departmentId: yup.string().required("Department Id is required")
})


const FormEditPurchaseRequisition = (props) => {
    const {handleEditSubmit, defaultValues} = props;

    const classes = useStyles();
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });
    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleEditSubmit)}>

            <Controller render={({field: {value,onChange}}) => (
                <CustomTextField
                    label="Department Id"
                    placeholder="Enter our department id"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    inputError={errors.departmentId}
                />
            )} name={"departmentId"} control={control} defaultValue={defaultValues.departmentId} />

            <Controller render={({field:{value, onChange}})=>(
                <CustomTextField
                    label="Description"
                    placeholder="Provide a brief description of the need, emergency and items needed"
                    fullWidth
                    multiline
                    value={value}
                    onChange={onChange}
                    inputError={errors.description}
                />
            )} name={"description"} control={control} defaultValue={defaultValues.description} />

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

export default FormEditPurchaseRequisition;