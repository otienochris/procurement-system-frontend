import React, {useEffect, useState} from 'react';
import {useStyles} from "./Employees";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormRequestForInformation from "./forms/FormRequestForInformaton";
import {deleteRFI, getAllRFIs, saveRFI} from "../../services/request-for-information-service";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import {openNewWindow} from "./PurchaseRequisitions";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";

const RequestsForInformation = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const classes = useStyles();
    const token = useSelector(state => state.token);
    const [requestsForInformation, setRequestsForInformation] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllRFI":
                const rfi = await getAllRFIs(token)
                    .then(response => response).then(result => result.json());
                setRequestsForInformation(rfi)
                break;
            case "saveRFI":
                await saveRFI(body, token)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(true);
                            setOpenPopup(false);
                            toast.success("Request For information added successfully", toastOptions);
                        } else {
                            setOpenPopup(false);
                            toast.error("Error adding Request For information", toastOptions);
                        }
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Error connecting to the server", toastOptions);
                    })
                setUpdateTable(false);
                break;
            case "delete":
                await deleteRFI(token, body).then(response => {
                    setUpdateTable(true)
                    return response.ok ? toast.success("Successfully deleted the item", {position: "bottom-right"})
                        : toast.error("Error deleting the item", {position: "bottom-right"});
                }).then().catch(reason => {
                    return toast.info("Oops! Could not communicate to the server", {position: "bottom-right"})
                })
            default:
                break;
        }
    }

    const handleFormSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("purchaseOrderId", data.purchaseOrderId);
        formData.append("rfi", data.rfi[0]);
        formData.append("description", data.description);
        fetchData("saveRFI", formData).then()
    }

    useEffect(() => {
        fetchData("getAllRFI").then()
    }, [updateTable])

    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title={"Request For Information"}
                columns={[
                    {title: "Serial Number", field: "id"},
                    {title: "purchase Order Id", field: "purchaseOrderId"},
                    {title: "Description", field: "description"},
                    {
                        title: "Data Created", field: "dateCreated", render: (rowData) => {
                            return new Date(rowData.dateCreated).toDateString();
                        }
                    },
                    {
                        title: "Request for Information Document", field: "rfiUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.rfiUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.rfiUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    }]}
                data={requestsForInformation}
                setOpenPopup={setOpenPopup}
                handleDelete={fetchData}
            />
            <Popup title={"Add Request for information"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormRequestForInformation handleFormSubmit={handleFormSubmit}/>

            </Popup>
        </div>
    )
}

export default RequestsForInformation;