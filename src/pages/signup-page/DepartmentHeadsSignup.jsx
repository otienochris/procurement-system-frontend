import React from "react";
import FormDepartmentsHeadsSignup from "./Forms/FormDepartmentsHeadsSignup";
import {saveDepartmentHead} from "../../services/users/department-heads-service";
import {toast} from "react-toastify";
import {options} from "../login-page";

const DepartmentHeadsSignup = (props) => {

    const {setIsLoading, setIsSuccessful} = props;

    const fetchData = async (data) => {
        delete data.password2;
        setIsLoading(true);
        await saveDepartmentHead(data).then(response => {
            if (response.ok) {
                toast.success("Signup successfully", options);
                setIsSuccessful(true);
            } else {
                toast.error("Error Signing you up", options);
                setIsSuccessful(false);
            }
        }).then().catch(error => {
            setIsLoading(false);
            toast.info("Oop! Could not connect to the server", options);
        })
        setIsLoading(false)
    }

    const handleFormSubmit = (data) => {
        fetchData(data).then();
    }
    return (
        <FormDepartmentsHeadsSignup handleFormSubmit={handleFormSubmit}/>
    )
}

export default DepartmentHeadsSignup;