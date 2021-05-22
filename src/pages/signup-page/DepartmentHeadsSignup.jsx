import React from "react";
import FormDepartmentsHeadsSignup from "./Forms/FormDepartmentsHeadsSignup";
import {saveDepartmentHead} from "../../services/users/department-heads-service";

const DepartmentHeadsSignup = (props) => {

    const {setIsLoading, setIsSuccessful} = props;

    const fetchData = async (data) => {
        delete data.password2;
        setIsLoading(true);
        await saveDepartmentHead(data).then(response => {
            if (response.ok) {
                alert("ok")
                setIsSuccessful(true);
            } else {
                alert("failed");
                setIsSuccessful(false);
            }
        }).then(result => {
            console.log(result)
        }).catch(error => console.log(error))
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