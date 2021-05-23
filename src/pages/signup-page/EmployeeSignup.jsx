import React from "react";
import FormEmployeeSignup from "./Forms/FormEmployeeSignup";
import {saveEmployee} from "../../services/users/employee-service";
import {userActions} from "../../actions";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {options} from "../login-page";


const EmployeeSignup = (props) => {
    const {setIsLoading, setIsSuccessful} = props;
    const dispatch = useDispatch();
    const fetchData = async (body) => {
        setIsLoading(true);
        await saveEmployee(body).then(response => {
            if (response.ok){
                setIsSuccessful(true);
                toast.success("Signup Successfully", options);
            }else {
                setIsSuccessful(false);
                toast.error("Error signing up", options);
            }
        }).then().catch(error =>{
            toast.info("Oops! Could not connect to the server", options);
            setIsLoading(false);
        })
        setIsLoading(false);
    }

    const submitEmployeeForm = (data) => {
        dispatch(userActions("SET_USERNAME", data.empId))
        fetchData(data).then()
    }
    return(
        <FormEmployeeSignup handleFormSubmit={submitEmployeeForm}/>
    )
}

export default EmployeeSignup