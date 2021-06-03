import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable'
import {useStyles} from "./Employees"
import Popup from "../../components/customControls/Popup";
import {
    deleteDepartmentHead,
    getAllDepartmentHeads,
    saveDepartmentHead,
    updateDepartmentHead
} from "../../services/users/department-heads-service";
import {useSelector} from "react-redux";
import FormDepartmentsHeadsSignup from "../signup-page/Forms/FormDepartmentsHeadsSignup";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import FormEditDepartmentHead from "./forms/FormEditDepartmentHead";

const DepartmentHeads = () => {
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [departmentHeads, setDepartmentHeads] = useState([]);
    const [oldDepartmentHead, setOldDepartmentHead] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                const dh = await getAllDepartmentHeads(token).then(response => response).then(result => result.json());
                setDepartmentHeads(dh);
                break;
            case "save":
                await saveDepartmentHead(body).then(response => {
                    if (response.ok) {
                        setUpdateTable(!updateTable);
                        setOpenPopup(false);
                        toast.success("Department Head Saved Successfully", toastOptions);
                    } else {
                        setOpenPopup(false);
                        toast.error("Failed to save the Department Head", toastOptions);
                    }
                }).then().catch(error => {
                    toast.info("Oops! Could not connect to the server", toastOptions);
                })
                break;
            case "delete":
                let empId = oldDepartmentHead.empId.replaceAll("/", "_");

                await deleteDepartmentHead(token, empId)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Department Head Deleted Successfully", toastOptions);
                        } else {
                            toast.error("Failed to delete the Department Head", toastOptions);
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            case "update":
                let id = oldDepartmentHead.empId.replaceAll("/", "_");
                await updateDepartmentHead(token, id, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false)
                            toast.success("Department Head updated Successfully", toastOptions);
                        } else {
                            toast.error("Failed to update the Department Head", toastOptions);
                        }
                    })
                    .then()
                    .catch(()=> toast.info("Oops! Could not connect to the server",{position: "bottom-right"}));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAll").then();
    }, [updateTable])

    const handleFormSubmit = (data) => {
        delete data.password2;
        fetchData("save", data).then();
    }

    const handleEdit = (rowData) => {
        setOldDepartmentHead(rowData);
    }

    const handleEditSubmit = (newDepartmentHead) => {
        fetchData("update", newDepartmentHead).then();
    }

    // console.log(departmentHeads)

    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Department Heads"
                columns={[
                    {title: "Employment Id", field: "empId"},
                    {title: "Department Id", field: "departmentId"},
                    {title: "Email", field: "email"},
                    {title: "Full Name", field: "name"},
                    {
                        title: "Status", field: "active", render: (rowData) => {
                            if (!rowData.isActive) {
                                return <CustomButton text={"Disabled"} style={{backgroundColor: "red"}}/>
                            } else {
                                return <CustomButton text={"Active"} style={{backgroundColor: "green"}}/>
                            }
                        }
                    },

                ]}
                data={departmentHeads}
                setOpenPopup={setOpenPopup}
                setOpenEdit={setOpenEdit}
                handleDelete={fetchData}
                handleEdit={handleEdit}
            />
            <Popup title={"Add Department Head"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormDepartmentsHeadsSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
            <Popup title={"Edit department head"} openPopup={openEdit} setOpenPopup={setOpenEdit}>
                <FormEditDepartmentHead defaultValues={oldDepartmentHead} handleEditSubmit={handleEditSubmit}/>
            </Popup>
        </div>
    );
}

export default DepartmentHeads
