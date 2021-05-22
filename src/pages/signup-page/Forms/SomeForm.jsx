import React from "react";
import CustomTextField from "../../../components/customControls/CustomTextField";
import CustomButton from "../../../components/customControls/CustomButton";
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    username: yup.string().required()
})

const SomeForm = (props) => {
    const {handleFormSubmit} = props;
    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/*<CustomTextField label={"username"} {...register("username")} />*/}
            <CustomTextField
                label="Department Id"
                placeholder="Enter department Id"
                fullWidth
                // inputError={errors.departmentId}
            />
            <CustomTextField
                label="Employee Id"
                placeholder="Enter your Employee Id"
                fullWidth
                // inputError={errors.empId}
            />
            <CustomTextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                fullWidth
                // inputError={errors.email}
            />
            <CustomTextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                fullWidth
                // inputError={errors.password}
            />
            <CustomTextField
                label="Confirm Password"
                placeholder="Confirm your email"
                type="password"
                fullWidth
                // inputError={errors.password2}
            />
            <CustomButton type={"submit"} text={"submit"} variant={"outlined"} />
        </form>
    )
}

export default SomeForm;