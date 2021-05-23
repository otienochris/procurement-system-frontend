import React from "react";
import FormEmployeeSignup from "./Forms/FormEmployeeSignup";
import {saveEmployee} from "../../services/users/employee-service";
import {userActions} from "../../actions";
import {useDispatch} from "react-redux";


const EmployeeSignup = (props) => {
    const {setIsLoading, setIsSuccessful} = props;
    const dispatch = useDispatch();
    let message;
    const fetchData = async (body) => {
        setIsLoading(true);
        await saveEmployee(body).then(response => {
            if (response.ok){
                setIsSuccessful(true);
                message = "signup successful"
            }else {
                setIsSuccessful(false);
                message = "signup failed"
            }
        }).then(result => {
            console.log(result);

            setIsLoading(false)
        }).catch(error => console.log(error))
        setIsLoading(false);
        { message && alert(message) }
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