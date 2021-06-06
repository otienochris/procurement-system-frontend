import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import {useStyles} from "./Employees";
import FormSupplierSignup from "../signup-page/Forms/FormSupplierSignup";
import {
    deleteSupplier,
    getAllSuppliers,
    saveSupplier,
    toggleAccountStatus,
    updateSupplier
} from "../../services/users/supplier-service";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import FormEditSupplier from "./forms/FormEditSupplier";


function Suppliers(props) {
    const token = useSelector((state) => state.token);
    const [suppliers, setSuppliers] = useState([])
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const classes = useStyles();

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                const suppliersFromDB = await getAllSuppliers(token)
                    .then(response => response)
                    .then(result => result.json());
                setSuppliers(suppliersFromDB);
                break;
            case "save":
                await saveSupplier(body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(true);
                            setOpenPopup(false);
                            toast.success("Supplier Successfully added", toastOptions);
                        } else {
                            toast.error("Error saving supplier", toastOptions);
                        }
                    }).then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions);
                    });
                break;
            case "delete":
                await deleteSupplier(token, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Successfully delete the supplier", {position: "bottom-right"})
                        } else {
                            toast.error("Error deleting the supplier", {position: "bottom-right"})
                        }
                    })
                    .then()
                    .catch(()=> toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            case "update":
                await updateSupplier(token, defaultValues.kra, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false);
                            toast.success("Successfully updated the supplier", {position: "bottom-right"})
                        } else {
                            toast.error("Error updating  the supplier", {position: "bottom-right"})
                        }
                    })
                    .then()
                    .catch(() => {
                        toast.info("Oops! Could not connect to the server", {position: "bottom-right"})
                    })
                break;
            case "toggleStatus":
                await toggleAccountStatus(token, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Successfully changed Account status", {position: "bottom-right"})
                        } else {
                            toast.error("Error changing account status", {position: "bottom-right"})
                        }
                    })
                    .then()
                    .catch(() => {
                        toast.info("Oops! Could not connect to the server", {position: "bottom-right"})
                    })
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

    const handleEditSubmit = (rowData) => {
        fetchData("update", rowData).then();
    }

    const handleEdit = (rowData) => {
        setDefaultValues(rowData);
    }

    const toggleStatus = (e) => {
        fetchData("toggleStatus", e.currentTarget.value).then()
    }

    return (
        <>
            <div className={classes.spacingStyle}>
                <CustomMaterialTable
                    title="Suppliers"
                    columns={[
                        {title: "Kra Pin", field: "kra"},
                        {title: "Title", field: "name"},
                        {title: "Email", field: "email"},
                        {title: "Description", field: "description"},
                        {
                            title: "Status",
                            field: "isAccountActive",
                            default: "false",
                            // editable: false,
                            // defaultGroupOrder: 0,
                            render: (rowData) => !rowData.isAccountActive ?
                                <CustomButton
                                    value={rowData.kra}
                                    onClick={e => toggleStatus(e)}
                                    text={"Disabled"} style={{backgroundColor: "red"}}/> :
                                <CustomButton
                                    value={rowData.kra}
                                    onClick={e => toggleStatus(e)}
                                    text={"Activated"}
                                    style={{backgroundColor: "green"}}
                                />
                        },
                    ]}
                    setOpenPopup={setOpenPopup}
                    setOpenEdit={setOpenEdit}
                    data={suppliers}
                    handleEdit={handleEdit}
                    handleDelete={fetchData}
                />
            </div>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Supplier">
                <FormSupplierSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
            <Popup title={"Edit supplier details"} openPopup={openEdit} setOpenPopup={setOpenEdit}>
                <FormEditSupplier handleEditSubmit={handleEditSubmit} defaultValues={defaultValues}/>
            </Popup>
        </>
    );
}

export default Suppliers;
