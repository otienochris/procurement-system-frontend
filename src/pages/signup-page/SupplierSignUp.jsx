import React, {useState} from "react";
import FormSupplierSignup from "./Forms/FormSupplierSignup";
import {saveSupplier} from "../../services/users/supplier-service";
import {toast} from "react-toastify";
import {options} from "../login-page";

const approveUrl = "https://api.appruve.co/v1/verifications/ke/kra";
const testKraValidationToken =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4YmFhM2RkNS04NTkxLTQzZDYtYjY1MC1kOTExNzdkNGYxMDciLCJhdWQiOiI5NGNmMTYyMS0wYTUwLTRlZTctYjc0Zi1mNDkwNjVkMjNkMTkiLCJzdWIiOiIxYWQwY2FiYS0zMDBjLTRjNjItODQxNy03NmJmYWVhM2I5YzEiLCJuYmYiOjAsInNjb3BlcyI6WyJ2ZXJpZmljYXRpb25fdmlldyIsInZlcmlmaWNhdGlvbl9saXN0IiwidmVyaWZpY2F0aW9uX2RvY3VtZW50IiwidmVyaWZpY2F0aW9uX2lkZW50aXR5Il0sImV4cCI6MTYyMDUzNjg1MCwiaWF0IjoxNjE3OTQ0ODUwfQ.sOi46uzz9iL54b4CPanxVmx3SraS--to_TEIE2A-em4";

const SupplierSignUp = (props) => {
    const {setIsLoading, setIsSuccessful} = props;
    const [isKraValid, setIsKraValid] = useState(false);

    const fetchData = async (type, data) => {
        switch (type) {
            case "verifyKra":
                await fetch(approveUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: testKraValidationToken,
                    },
                    body: JSON.stringify({pin: data.kRA}),
                }).then(response => {
                    return response.ok ? setIsKraValid(true) : alert("Invalid kra");
                }).then()
                break
            case "saveSupplier":
                setIsLoading(true);
                await saveSupplier(data)
                    .then(response => {
                        setIsSuccessful(true);
                        return response.ok
                            ? toast.success("Supplier registered successfully", options)
                            : toast.error("Error Saving Supplier", options)
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", options);
                        setIsLoading(false)
                    });
                setIsLoading(false)
                break;
            default:
                break;
        }

    }

    const handleFormSubmit = (data) => {
        delete data.password2;
        // fetchData("verifyKra", data).then()
        fetchData("saveSupplier", data).then()
        // todo verifyKra(data.kRA);

    };
    return <FormSupplierSignup handleFormSubmit={handleFormSubmit}/>;
}
export default SupplierSignUp;
