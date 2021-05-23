import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable'
import {useStyles} from "./Employees"
import Popup from "../../components/customControls/Popup";
import {getAllDepartmentHeads, saveDepartmentHead} from "../../services/users/department-heads-service";
import {useSelector} from "react-redux";
import FormDepartmentsHeadsSignup from "../signup-page/Forms/FormDepartmentsHeadsSignup";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";

const DepartmentHeads = () => {
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [departmentHeads, setDepartmentHeads] = useState([])
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllDepartmentHeads":
                const dh = await getAllDepartmentHeads(token).then(response => response).then(result => result.json());
                setDepartmentHeads(dh);
                break;
            case "saveDepartmentHead":
                await saveDepartmentHead(body).then(response => {
                    if (response.ok) {
                        setUpdateTable(true);
                        setOpenPopup(false);
                        toast.success("Department Head Saved Successfully", toastOptions);
                    } else {
                        setOpenPopup(false);
                        toast.error("Failed to save the Department Head", toastOptions)
                    }
                }).then().catch(error => {
                    toast.info("Oop! Could not connect to the server", toastOptions)
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAllDepartmentHeads").then();
    }, [updateTable])

    const handleFormSubmit = (data) => {
        delete data.password2;
        fetchData("saveDepartmentHead", data).then();
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
            />
            <Popup title={"Add Department Head"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormDepartmentsHeadsSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    );
}

export default DepartmentHeads
