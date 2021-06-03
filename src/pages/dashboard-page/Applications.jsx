import React, {useEffect, useState} from 'react'
import {IconButton, Paper} from "@material-ui/core";
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
import {addApplication, deleteApplication, getAllApplications} from "../../services/applicationService";

const Applications = () => {
    const classes = useStyles();
    const [applications, setApplications] = useState([]);
    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false)

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllApplications":
                const apps = await getAllApplications(token).then(response => response).then(result => result.json());
                setApplications(apps);
                break;
            case "saveApplication":
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
            case "delete":
                await deleteApplication(token, body).then(response => {
                    if (response.ok) {
                        setUpdateTable(!updateTable);
                    }
                    return response.ok ? toast.success("Item successfully deleted", {position: "bottom-right"})
                        : toast.error("Error deleting the item", {position: "bottom-right"})
                }).then().catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break
            default:
                break;
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData()
        formData.append("purchaseOrderId", data.purchaseOrderId);
        formData.append("message", data.message);
        formData.append("quotationDocument", data.quotationDocument[0]);
        formData.append("informationDocument", data.informationDocument[0]);
        fetchData("saveApplication", formData).then()
    }

    useEffect(() => {
        fetchData("getAllApplications").then()
    }, [updateTable])

    return (
        <Paper className={classes.bodySection}>

            <div className={classes.spacingStyle}>
                <CustomMaterialTable
                    title={"Applications"}
                    columns={[
                        {title: "Serial Number", field: "id"},
                        {title: "Purchase Order Id", field: "purchaseOrderId", defaultGroupOrder: 0},
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
                        }
                    ]}
                    data={applications}
                    setOpenPopup={setOpenPopup}
                    handleDelete={fetchData}
                />
                <Popup title={"Add Application"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                    <FormAddApplication handleFormSubmit={handleFormSubmit}/>
                </Popup>
            </div>
        </Paper>
    )
}

export default Applications
