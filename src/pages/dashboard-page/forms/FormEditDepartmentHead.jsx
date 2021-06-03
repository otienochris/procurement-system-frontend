import React from "react";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {useStyles} from "../../signup-page";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    departmentId: yup.string().required("Department Id is required"),
    email: yup.string().email("Enter a valid email").required(),
    name: yup.string().required("Name is required"),
})

const FormEditDepartmentHead = (props) => {
    const {handleEditSubmit, defaultValues} = props;
    const classes = useStyles();

    const {handleSubmit, formState: {errors}, control} = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema)
    });
    return (
        <form className={classes.contentArea} onSubmit={handleSubmit(handleEditSubmit)}>
            <Controller render={({field: {value, onChange}})=> (
                <CustomTextField
                    label={"Department Id"}
                    placeholder={"enter department Id"}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    inputError={errors.departmentId}
                />
            )} name={"departmentId"} control={control} defaultValue={defaultValues.departmentId} />

            <Controller render={({field: {value, onChange}})=>(
                <CustomTextField
                    label={"Full Name"}
                    placeholder={"Enter your full name"}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    inputError={errors.name}
                />
            )} name={"name"} control={control} defaultValue={defaultValues.name}/>

            <Controller render={({field: {value, onChange}})=>(
                <CustomTextField
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    inputError={errors.email}
                />
            )} name={"email"} control={control} defaultValue={defaultValues.email}/>
            <CustomButton text={"submit"} type={"submit"}/>
        </form>
    )
}

export default FormEditDepartmentHead;