import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import {addContract, deleteContract, getAllContracts, updateContract} from "../../services/contract";
import {toast} from "react-toastify";
import Popup from "../../components/customControls/Popup";
import FormAddContract from "./forms/FormAddContract";
import CustomButton from "../../components/customControls/CustomButton";
import {IconButton} from "@material-ui/core";
import {openNewWindow} from "./PurchaseRequisitions";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormEditContract from "./forms/FormEditContract";

const Contracts = () => {
    const token = useSelector(state => state.token);
    const [contracts, setContracts] = useState([]);
    const [defaultValues, setDefaultValues] = useState({})
    const [updateTable, setUpdateTable] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                let contracts = [];
                contracts = await getAllContracts(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch();
                setContracts(contracts);
                break;
            case "save":
                await addContract(token, body).then(response => {
                    if (response.ok) {
                        setUpdateTable(!updateTable);
                        setOpenPopup(false);
                    }
                    return response.ok ?
                        toast.success("Item added successfully", {position: "bottom-right"})
                        : toast.error("Error adding the item, please try again", {position: "bottom-right"})
                });
                break
            case "delete":
                await deleteContract(token, body)
                    .then(response => {
                            if (response.ok) {
                                setUpdateTable(!updateTable);
                            }
                            return response.ok ?
                                toast.success("Item deleted successfully", {position: "bottom-right"}) :
                                toast.error("Error deleting the item", {position: "bottom-right"})
                        }
                    )
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}));
                break;
            case "update":
                await updateContract(token, body, defaultValues.id)
                    .then(response => {
                            if (response.ok) {
                                setUpdateTable(!updateTable);
                                setOpenEdit(false)
                                toast.success("Contract updated successfully", {position: "bottom-right"})
                            } else {
                                toast.error("Error updating the contract", {position: "bottom-right"})
                            }
                        }
                    )
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAll").then();
    }, [updateTable]);

    const handleFormSubmit = (data) => {

        const formData = new FormData();
        formData.append("expiryDate", data.expiryDate);
        formData.append("supplierId", data.supplierId);
        formData.append("purchaseOrderId", data.purchaseOrderId)
        formData.append("contractDocument", data.contractDocument[0]);

        fetchData("save", formData).then()
    }

    const handleEdit = (oldData) => {
        setDefaultValues(oldData);
    }

    const handleEditSubmit = (newData) => {
        const formData = new FormData();

        formData.append("expiryDate", newData.expiryDate);
        formData.append("supplierId", newData.supplierId);
        formData.append("purchaseOrderId", newData.purchaseOrderId)
        if (newData.contractDocument[0] !== undefined){
            formData.append("contractDocument", newData.contractDocument[0]);
        }

        fetchData("update", formData).then();
    }

    return (
        <>
            <CustomMaterialTable
                title={"Contracts"}
                columns={[
                    {title: "Contract Id", field: "id"},
                    {title: "Supplier Id", field: "supplierId"},
                    {title: "Purchase Id", field: "purchaseOrderId"},
                    {
                        title: "Date Awarded",
                        field: "dateAwarded",
                        render: (rowData) => new Date(rowData.dateAwarded).toDateString()
                    },
                    {
                        title: "Expiry Date",
                        field: "expiryDate",
                        render: (rowData) => new Date(rowData.expiryDate).toDateString()
                    },
                    {
                        title: "status",
                        field: "status",
                        render: rowData => rowData.status === "IN_PROGRESS" || rowData === "IN_PROGRESS" ?
                            <CustomButton text={"IN_PROGRESS"}
                                          style={{backgroundColor: "grey"}}/> : rowData.status === "CANCELLED" || rowData === "CANCELLED" ?
                                <CustomButton text={"CANCELLED"} style={{backgroundColor: "red"}}/> :
                                <CustomButton text={"COMPLETED"} style={{backgroundColor: "green"}}/>
                    },
                    {
                        title: "Contract Document", field: "contractDocumentUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.contractDocumentUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.contractDocumentUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    }
                ]}
                data={contracts}
                setOpenPopup={setOpenPopup}
                setOpenEdit={setOpenEdit}
                handleDelete={fetchData}
                handleEdit={handleEdit}
            />
            <Popup title="Add Contract" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormAddContract handleFormSubmit={handleFormSubmit}/>
            </Popup>
            <Popup title="Edit Contract" openPopup={openEdit} setOpenPopup={setOpenEdit}>
                <FormEditContract handleEditSubmit={handleEditSubmit} defaultValues={defaultValues} />
            </Popup>
        </>
    )
}

export default Contracts;