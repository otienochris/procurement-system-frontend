import React, {useEffect, useState} from 'react'
import {Button, ButtonGroup, IconButton, Paper} from "@material-ui/core";
import {useStyles} from "./Users";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {openNewWindow} from "./PurchaseRequisitions";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import Popup from "../../components/customControls/Popup";
import FormAddApplication from "./forms/FormAddApplication";
import {
    addApplication, approveApplication,
    deleteApplication,
    getAllApplications,
    updateApplication
} from "../../services/applicationService";
import FormEditApplication from "./forms/FormEditApplication";
import {getAllSolicitations} from "../../services/solicitation";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const Applications = () => {
    const classes = useStyles();
    const [applications, setApplications] = useState([]);
    const [solicitations, setSolicitations] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateTable, setUpdateTable] = useState(false)

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                const apps = await getAllApplications(token).then(response => response).then(result => result.json());
                const solicitations = await getAllSolicitations(token).then(res => res).then(result => result.json());
                setApplications(apps);
                setSolicitations(solicitations);
                break;
            case "save":
                await addApplication(token, body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            setOpenPopup(false);
                            toast.success("Application added successful", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Error adding Application, please try again", toastOptions);
                        }
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions)
                    })
                break;
            case "update":
                await updateApplication(token, body, defaultValues.id)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false);
                            toast.success("Application updated successful", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Error updating the Application", toastOptions);
                        }
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions)
                    })
                break
            case "delete":
                await deleteApplication(token, body).then(response => {
                    if (response.ok) {
                        setUpdateTable(!updateTable);
                    }
                    return response.ok ? toast.success("Item successfully deleted", {position: "bottom-right"})
                        : toast.error("Error deleting the item", {position: "bottom-right"})
                }).then().catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            case "approve":
                await approveApplication(token, body.id, body.status)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                            setOpenEdit(false);
                            toast.success("Application status changed successful", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Error changing Application's status", toastOptions);
                        }
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions)
                    })
                break
            default:
                break;
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData()
        formData.append("purchaseOrderId", data.purchaseOrderId);
        formData.append("supplierId", data.supplierId);
        formData.append("message", data.message);
        formData.append("quotationDocument", data.quotationDocument[0]);
        formData.append("informationDocument", data.informationDocument[0]);
        fetchData("save", formData).then()
    }
    const handleEdit = (rowData) => {
        setDefaultValues(rowData)
    }
    const handleEditSubmit = (newData) => {
        const formData = new FormData();
        formData.append("purchaseOrderId", newData.purchaseOrderId);
        formData.append("supplierId", newData.supplierId);
        formData.append("message", newData.message);
        if (newData.quotationDocument !== undefined){
            formData.append("quotationDocument", newData.quotationDocument[0]);
        }
        if (newData.informationDocument !== undefined){

            formData.append("informationDocument", newData.informationDocument[0]);
        }
        formData.forEach(value => {
            console.log(value);
        })
        fetchData("update", formData).then()
    }

    const handleApprovals = (e, id) => {
        fetchData("approve", {id, status: e.currentTarget.value}).then()
    }

    useEffect(() => {
        fetchData("getAll").then()
    }, [updateTable])

    return (
        <Paper className={classes.bodySection}>

            <div className={classes.spacingStyle}>
                <CustomMaterialTable
                    title={"Applications"}
                    columns={[
                        {title: "Serial Number", field: "id"},
                        {title: "Purchase Order Id", field: "purchaseOrderId", defaultGroupOrder: 0},
                        {title: "Supplier Id", field: "supplierId"},
                        {title: "Message", field: "message"},
                        {
                            title: "Date Created",
                            field: "dateCreated",
                            render: rowData => new Date(rowData.dateCreated).toDateString()
                        },
                        {
                            title: "Quotation Document", field: "quotationDownloadUrl", render: (rowData) => {
                                return <div>
                                    <IconButton onClick={() => openNewWindow(rowData.quotationDownloadUrl)}>
                                        <ImportContactsIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => openNewWindow(rowData.quotationDownloadUrl)}>
                                        <GetAppIcon/>
                                    </IconButton>
                                </div>
                            }
                        },
                        {
                            title: "Information Document", field: "informationDownloadUrl", render: (rowData) => {
                                return <div>
                                    <IconButton onClick={() => openNewWindow(rowData.informationDownloadUrl)}>
                                        <ImportContactsIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => openNewWindow(rowData.informationDownloadUrl)}>
                                        <GetAppIcon/>
                                    </IconButton>
                                </div>
                            }
                        },
                        {title: "approval", render: (rowData) => {
                                return (
                                    rowData.status === "PENDING" ?
                                        <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                            <Button
                                                value={"COMPLETED"}
                                                onClick={e => handleApprovals(e, rowData.id)}
                                                color={"primary"}
                                            >
                                                accept
                                            </Button>
                                            <Button
                                                value={"CANCELLED"}
                                                color={"secondary"}
                                                onClick={ e => handleApprovals(e, rowData.id)}
                                                variant={"outlined"}
                                            >decline</Button>
                                        </ButtonGroup>: rowData.status === "COMPLETED" ?
                                        <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                        <CancelIcon fontSize={"large"} style={{color: "red"}} color={"error"} />
                                )
                            } }
                    ]}
                    data={applications}
                    setOpenPopup={setOpenPopup}
                    setOpenEdit={setOpenEdit}
                    handleDelete={fetchData}
                    handleEdit={handleEdit}
                />
                <Popup title={"Add Application"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                    <FormAddApplication solicitations={solicitations} applications={applications} handleFormSubmit={handleFormSubmit}/>
                </Popup>
                <Popup title={"Edit Application"} openPopup={openEdit} setOpenPopup={setOpenEdit}>
                    <FormEditApplication applications={applications} solicitations={solicitations} handleEditSubmit={handleEditSubmit} defaultValues={defaultValues} />
                </Popup>
            </div>
        </Paper>
    )
}

export default Applications
