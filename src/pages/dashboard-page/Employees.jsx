import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormEmployeeSignup from "../signup-page/Forms/FormEmployeeSignup";
import {getAllEmployees, saveEmployee} from "../../services/users/employee-service";
import {useSelector} from "react-redux";
import CustomButton from "../../components/customControls/CustomButton";

export const useStyles = makeStyles((theme) => ({
    spacingStyle: {
        margin: "auto auto",
        maxWidth: "95%",
        marginTop: "12vh",
    },
    fileButtons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
    },
}));

const addEmployee = async (url, requestHeader) => {
    try {
        const response = await fetch(url, requestHeader);
        const result = await response.json();
        if (response.ok) {
            alert("please verify your email to activate your account");
        } else {
            alert(result.message);
        }
    } catch (errors) {
        console.log(errors);
    }
};

function Employees() {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllEmployees":
                const employeesFromDb = await getAllEmployees(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch(error => console.log(error));
                setEmployees(employeesFromDb)
                break;
            case "saveEmployee":
                await saveEmployee(body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(true);
                            setOpenPopup(false)
                            alert("Employee added successfully");
                        } else {
                            setOpenPopup(false);
                            alert("Failed to add employees");
                        }
                    }).then();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAllEmployees").then()
    }, [updateTable])

    const handleFormSubmit = (data) => {
        delete data.password2;
        fetchData("saveEmployee", data).then()
    }
    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Employees"
                columns={[
                    {title: "Employment Id", field: "employmentId"},
                    {title: "Name", field: "name"},
                    {title: "Email", field: "email"},
                    {title: "Position", field: "position"},
                    {
                        title: "Role", field: "roles.role",
                        // defaultGroupOrder: 0
                    },
                    {
                        title: "STATUS",
                        field: "isActive",
                        default: "false",
                        // defaultGroupOrder: 0,
                        render: (rowData) =>
                            rowData.isActive ? <CustomButton text={"Active"} style={{backgroundColor: "green"}}/>
                                : <CustomButton text={"Disabled"} style={{backgroundColor: "red"}}/>
                    },
                ]}
                setOpenPopup={setOpenPopup}
                data={employees}
                setData={setEmployees}
            />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Employee">
                <FormEmployeeSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    );
}

export default Employees;

// {
//   "dataCreated": "2021-05-03T13:20:06.988Z",
//   "dateModified": "2021-05-03T13:20:06.988Z",
//   "email": "string",
//   "employmentId": "string",
//   "isActive": true,
//   "name": "string",
//   "position": "string",
//   "roles": {
//     "id": 0,
//     "role": "ROLE_ADMIN"
//   }
// }
