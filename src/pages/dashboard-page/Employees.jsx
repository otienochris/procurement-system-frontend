import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormEmployeeSignup from "../signup-page/Forms/FormEmployeeSignup";
import {getAllEmployees, saveEmployee} from "../../services/users/employee-service";
import {useSelector} from "react-redux";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";

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
                            setOpenPopup(false);
                            toast.success("Employee added successfully", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Failed to add employees", toastOptions);
                        }
                    }).then().catch(reason => {
                        toast.info("Oop! Could not connect to the server", toastOptions)
                    });
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
