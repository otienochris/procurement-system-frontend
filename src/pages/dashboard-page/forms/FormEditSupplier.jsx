import React from "react";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {useStyles} from "../../signup-page";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    email: yup.string().email("Please enter a valid email").required()
});
const FormEditSupplier = (props) => {
    const classes = useStyles()
    const {handleEditSubmit, defaultValues} = props;
    const { handleSubmit, formState: {errors}, control} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema),
    })
    return (
        <form onSubmit={handleSubmit(handleEditSubmit)} className={classes.contentArea} >
            <Controller render={({field: {value, onChange}})=> (
                <CustomTextField
                    label="Company's Name"
                    placeholder="enter company's name"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    inputError={errors.name}
                />
            )} name={"name"} defaultValue={defaultValues.name} control={control} />

            <Controller render={({field:{value, onChange}}) => (
                <CustomTextField
                    label="Company's Email"
                    placeholder="enter company's email"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    inputError={errors.email}
                />
            )} name={"email"} control={control} defaultValue={defaultValues.email} />

            <Controller render={({field: {value, onChange}}) => (
                <CustomTextField
                label="Description"
                placeholder="Provide a brief description of the company including your location and mode of operation"
                fullWidth
                multiline
                value={value}
                onChange={onChange}
                inputError={errors.description}

                />
            )} name={"description"} control={control} defaultValue={defaultValues.description} />

            <CustomButton text="submit" type="submit"/>
        </form>
    )
}

export default FormEditSupplier;