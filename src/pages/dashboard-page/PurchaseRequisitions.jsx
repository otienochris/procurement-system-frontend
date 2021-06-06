import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees";
import Popup from "../../components/customControls/Popup";
import FormPurchaseRequisition from "./forms/FormPurchaseRequisition";
import {
    approvePurchaseRequisition,
    deletePurchaseRequisition,
    getAllPurchaseRequisitions,
    savePurchaseRequisition,
    updatePurchaseRequisition
} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import FormEditPurchaseRequisition from "./forms/FormEditPurchaseRequisition";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export const openNewWindow = (url) => {
    window.open(url)
}

function PurchaseRequisitions() {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const token = useSelector(state => state.token);
    const [purchaseRequisitions, setPurchaseRequisitions] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                let PR = [];
                PR = await getAllPurchaseRequisitions(token).then(resp => resp)
                    .then(result => result.json());
                setPurchaseRequisitions(PR);
                break
            case "save":
                await savePurchaseRequisition(token, body).then(resp => {
                    if (resp.ok) {
                        setUpdateTable(!updateTable);
                        setOpenPopup(false);
                        toast.success("Purchase Requisition added successfully", toastOptions);
                    } else {
                        setOpenPopup(false);
                        toast.error("error adding purchase requisition", toastOptions);
                    }
                }).then().catch(reason => {
                    toast.info("Oops! Could not connect to the server", toastOptions)
                })
                break;
            case "delete":
                await deletePurchaseRequisition(token, body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Item successfully deleted", {position: "bottom-right"});
                        } else {
                            toast.error("Error deleting the item", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}));
                break;
            case "update":
                await updatePurchaseRequisition(token, body, defaultValues.id)
                    .then(response => {
                            if (response.ok) {
                                setUpdateTable(!updateTable);
                                setOpenEdit(false);
                                toast.success("Item successfully updated", {position: "bottom-right"});
                            } else {
                                toast.error("Error updating the item", {position: "bottom-right"});
                            }
                        })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}));
                break;
            case "approve":
                await approvePurchaseRequisition(token, body.id, body.status)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Successfully updated the purchase requisition's status", {position: "bottom-right"});
                        } else {
                            toast.error("Error changing the item's status", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}));
                break;
            default:
                break
        }
    }

    const handleEdit = (rowData) => {
        setDefaultValues(rowData);
    }
    const handleEditSubmit = (newData) => {
        const formData = new FormData();
        if (newData.acquisitionDocument.length[0] !== undefined) {
            formData.append("acquisitionDocument", newData.acquisitionDocument[0]);
        }
        if (newData.needDocument[0] !== undefined) {
            formData.append("needDocument", newData.needDocument[0]);
        }
        if (newData.analysisDocument[0] !== undefined) {
            formData.append("analysisDocument", newData.analysisDocument[0]);
        }
        if (newData.emergencyDocument[0] !== undefined) {
            formData.append("emergencyDocument", newData.emergencyDocument[0]);
        }
        formData.append("description", newData.description);
        formData.append("departmentId", newData.departmentId);

        fetchData("update", formData).then()
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("acquisitionDocument", data.acquisitionDocument[0]);
        formData.append("needDocument", data.needDocument[0]);
        formData.append("analysisDocument", data.analysisDocument[0]);
        formData.append("emergencyDocument", data.emergencyDocument[0]);
        formData.append("description", data.description);
        formData.append("departmentId", data.departmentId);

        fetchData("save", formData).then()
    }

    const handleApprovals = (e, id) => {
        const body = {id, status: e.currentTarget.value}
        fetchData("approve", body).then();
    }

    useEffect(() => {
        fetchData("getAll").then()
    }, [updateTable])


    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Purchase Requisition"
                columns={[
                    {title: "Serial Number", field: "id"},
                    {title: "Description", field: "description"},
                    {title: "department", field: "departmentId"},
                    {
                        title: "Date Created",
                        field: "dateCreated",
                        render: rowData => new Date(rowData.dateCreated).toDateString()
                    },
                    {
                        title: "Need Doc", field: "needDocumentUrl", render: (rowData) => {
                            return <div>
                                <IconButton size={"small"}
                                            onClick={() => openNewWindow(rowData.needDocumentUrl)}
                                ><ImportContactsIcon/></IconButton>
                                <IconButton size={"small"}
                                            onClick={() => openNewWindow(rowData.needDocumentUrl)}
                                ><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Analysis Doc", field: "analysisDocumentUrl", render: (rowData) => {
                            return <div>
                                <IconButton size={"small"}
                                            onClick={() => openNewWindow(rowData.analysisDocumentUrl)}
                                >
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton size={"small"}
                                            onClick={() => openNewWindow(rowData.analysisDocumentUrl)}
                                ><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Emergency Doc", field: "emergencyDocumentUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)} size={"small"}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)} size={"small"}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Acquisition Doc",
                        field: "emergencyDocumentUrl",
                        render: (rowData) => {
                            return (
                                <div>
                                    <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)}
                                                size={"small"}>
                                        <ImportContactsIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)}
                                                size={"small"}>
                                        <GetAppIcon/>
                                    </IconButton>
                                </div>
                            )
                        }
                    },
                    {title: "status", field: "status", render: (rowData) => {
                            return (
                                rowData.status === "PENDING" ?
                                    <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                        <Button
                                            value={"COMPLETED"}
                                            onClick={e => handleApprovals(e, rowData.id)}
                                            color={"primary"}
                                        >
                                            approve
                                        </Button>
                                        <Button
                                            value={"CANCELLED"}
                                            color={"secondary"}
                                            onClick={ e => handleApprovals(e, rowData.id)}
                                            variant={"outlined"}
                                        >decline</Button>
                                    </ButtonGroup>: rowData.status === "COMPLETED" ?
                                    <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                    <CancelIcon fontSize={"large"} color={"error"} />
                            )
                        }}

                ]}
                data={purchaseRequisitions}
                setOpenPopup={setOpenPopup}
                setOpenEdit={setOpenEdit}
                handleDelete={fetchData}
                handleEdit={handleEdit}
            />
            <Popup title={"Add Purchase Requisition"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseRequisition handleFormSubmit={handleFormSubmit} defaultValues={defaultValues}/>
            </Popup>
            <Popup title={"Edit Purchase Requisition"} openPopup={openEdit} setOpenPopup={setOpenEdit}>
                <FormEditPurchaseRequisition handleEditSubmit={handleEditSubmit} defaultValues={defaultValues}/>
            </Popup>
        </div>
    );
}

export default PurchaseRequisitions
