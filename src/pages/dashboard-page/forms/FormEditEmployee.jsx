import {useStyles} from "../../signup-page";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomTextField from "../../../components/customControls/CustomTextField";
import {FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";
import CustomButton from "../../../components/customControls/CustomButton";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(6, "name must be at least 5 characters")
        .max(50, "name cannot exceed 8 characters"),
    empId: yup
        .string()
        .matches(/^[A-Z]\d{2}\/\d{5}\/\d{2}$/, "enter a valid employment id"),
    email: yup.string().email("enter a valid email"),
    position: yup.string()
});

const FormEditEmployee = (props) => {
    const {handleEdit, defaultValues} = props;
    const classes = useStyles()

    const {
        formState: {errors},
        handleSubmit,
        control
    } = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: yupResolver(schema)
    });



    return (
        <form
                onSubmit={handleSubmit(handleEdit)}
                className={classes.contentArea}
            >
                <Controller render={({field: {onChange, value}}) => (
                    <CustomTextField
                        label="full name"
                        placeholder="please enter your full name"
                        fullWidth
                        inputError={errors.name}
                        value={value}
                        onChange={onChange}
                    />
                )}
                            name={"name"}
                            control={control}
                            defaultValue={defaultValues.name}
                />


                <Controller render={({field: {value, onChange}}) => (
                    <CustomTextField
                        label="Employee Id"
                        placeholder="Please enter your employee id"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        inputError={errors.empId}
                    />
                )} name={"empId"} control={control} defaultValue={defaultValues.id}/>
                <Controller render={({field: {value, onChange}})=>(
                    <FormControl fullWidth>
                        <InputLabel className={classes.inputLabel}>Position</InputLabel>
                        <Select
                            native
                            variant="outlined"
                            error={!!errors.position}
                            defaultValue={defaultValues.position}
                        >
                            <option value="">{}</option>
                            <option value="PROCUREMENT_OFFICER">Procurement officer</option>
                            <option value="INVENTORY_MANAGER">Inventory Manager</option>
                            <option value="FINANCE">Finance</option>
                            <option value="INTERN">Intern</option>
                            <option value="HUMAN_RESOURCE_MANAGER">Human Resource Manager</option>
                            <option value="PROCUREMENT_MANAGER">Procurement Manager</option>
                            <option value="STORES_MANAGER">Stores Manager</option>
                            <option value="PURCHASING_ASSISTANT">Purchasing Assistant</option>
                            <option value="ICT_MANAGER">ICT Manager</option>

                        </Select>
                        <FormHelperText className={`${classes.error} ${classes.inputLabel}`}>
                            {errors.position?.message}
                        </FormHelperText>
                    </FormControl>
                )} name={"position"} control={control} />

                <Controller render={({field: {value, onChange}})=> (
                    <CustomTextField
                        label="email"
                        placeholder="Please enter your email"
                        type="email"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        inputError={errors.email}
                    />
                )} name={"email"} defaultValue={defaultValues.email} control={control}/>

                <CustomButton text="submit" type="submit"/>
            </form>
    );
}
export default FormEditEmployee;