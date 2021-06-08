import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormEmployeeSignup from "../signup-page/Forms/FormEmployeeSignup";
import {deleteEmployee, getAllEmployees, saveEmployee, updateEmployee} from "../../services/users/employee-service";
import {useSelector} from "react-redux";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import FormEditEmployee from "./forms/FormEditEmployee";
import {toggleAccountStatus} from "../../services/users/supplier-service";

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
    const [openEdit, setOpenEdit] = useState(false);
    const [oldEmployeeData, setOldEmployeeData] = useState({});

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                const employeesFromDb = await getAllEmployees(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch(error => console.log(error));
                setEmployees(employeesFromDb)
                break;
            case "save":
                await saveEmployee(body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            setOpenPopup(false);
                            toast.success("Employee added successfully", {position: "bottom-right"});
                        } else {
                            setOpenPopup(false);
                            toast.error("Failed to add employees", {position: "bottom-right"});
                        }
                    }).then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", {position: "bottom-right"})
                    });
                break;
            case "delete":
                let id = body.replaceAll("/", "_");
                await deleteEmployee(token, id)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            setOpenPopup(false);
                            toast.success("Employee deleted successfully", {position: "bottom-right"});
                        } else {
                            setOpenPopup(false);
                            toast.error("Failed to delete employees", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            case "update":
                let empId = oldEmployeeData.id.replaceAll("/", "_");
                await updateEmployee(token, empId, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false);
                            toast.success("Employee updated successfully", {position: "bottom-right"});
                        } else {
                            setOpenPopup(false);
                            toast.error("Failed to update employees", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            case "toggleAccountStatus":
                let username = body.replaceAll("/", "_");
                await toggleAccountStatus(token, username)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false);
                            toast.success("Successfully changed account status", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Failed to change account status", toastOptions);
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", toastOptions))
                break
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAll").then()
    }, [updateTable])

    const handleFormSubmit = (data) => {
        delete data.password2;
        fetchData("save", data).then();

    }
    const handleEdit = (oldData) => {
        setOldEmployeeData(oldData);
        console.log(oldData);
    }
    const handleEditSubmit = (data) => {
        fetchData("update", data).then();
    }

    const toggleStatus = (e) => {
        fetchData("toggleAccountStatus", e.currentTarget.value).then();
    }
    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Employees"
                columns={[
                    {title: "Employment Id", field: "id"},
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
                        render: (rowData) => {
                            return rowData.isActive?
                                <CustomButton
                                    value={rowData.id}
                                    onClick={e => toggleStatus(e)}
                                    text={"Active"}
                                    style={{backgroundColor: "green"}}
                                /> :
                                <CustomButton
                                    value={rowData.id}
                                    onClick={e => toggleStatus(e)}
                                    text={"Disabled"}
                                    style={{backgroundColor: "red"}}
                                />
                        }                    },
                ]}
                setOpenPopup={setOpenPopup}
                setOpenEdit={setOpenEdit}
                data={employees}
                setData={setEmployees}
                handleEdit={handleEdit}
                handleDelete={fetchData}
                allowAdd={true}
                allowEdit={true}
                allowDelete={true}
            />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Employee">
                <FormEmployeeSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
            <Popup openPopup={openEdit} setOpenPopup={setOpenEdit} title={"Edit Employee"}>
                <FormEditEmployee handleEdit={handleEditSubmit} defaultValues={oldEmployeeData}/>
            </Popup>
        </div>
    );
}

export default Employees;
