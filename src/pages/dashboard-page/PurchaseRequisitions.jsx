import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees";
import Popup from "../../components/customControls/Popup";
import FormPurchaseRequisition from "./forms/FormPurchaseRequisition";
import {
    deletePurchaseRequisition,
    getAllPurchaseRequisitions,
    savePurchaseRequisition
} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";

export const openNewWindow = (url) => {
    window.open(url)
}

function PurchaseRequisitions() {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const token = useSelector(state => state.token);
    const [purchaseRequisitions, setPurchaseRequisitions] = useState()
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllPurchaseRequisitions":
                const PR = await getAllPurchaseRequisitions(token).then(resp => resp)
                    .then(result => result.json());
                setPurchaseRequisitions(PR);
                break
            case "savePurchaseRequisition":
                await savePurchaseRequisition(token, body).then(resp => {
                    if (resp.ok) {
                        setUpdateTable(true);
                        setOpenPopup(false);
                        toast.success("Purchase Requisition added successfully", toastOptions);
                    } else {
                        setOpenPopup(false);
                        toast.error("error adding purchase requisition", toastOptions);
                    }
                    setUpdateTable(false)
                }).then().catch(reason => {
                    toast.info("Oops! Could not connect to the server", toastOptions)
                })
                break;
            case "delete":
                await deletePurchaseRequisition(token, body).then(response => {
                    response.ok
                        ? toast.success("Item successfully deleted", {position: "bottom-right"})
                        : toast.error("Error deleting the item", {position: "bottom-right"})
                }).then().catch(reason => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}));
                setUpdateTable(true)
                break;
            default:
                break
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        // if (!(data.acquisitionDocument.length === 0)) {
        //     formData.append("acquisitionDocument", data.acquisitionDocument[0]);
        // }
        formData.append("needDocument", data.needDocument[0]);
        formData.append("analysisDocument", data.analysisDocument[0]);
        formData.append("emergencyDocument", data.emergencyDocument[0]);
        formData.append("description", data.description);
        fetchData("savePurchaseRequisition", formData).then()

    }

    useEffect(() => {
        fetchData("getAllPurchaseRequisitions").then()
        setUpdateTable(false)
    }, [updateTable])



    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Purchase Requisition"
                columns={[
                    {title: "Serial Number", field: "id"},
                    {title: "Description", field: "description"},
                    {title: "department", field: "departmentId"},
                    {title: "Date Created", field: "dateCreated", render:rowData => new Date(rowData.dateCreated).toDateString()},
                    {
                        title: "Need Doc", field: "needDocumentUrl",render: (rowData) => {
                            return <div >
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
                            console.log(rowData);
                            return <div >
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
                            return <div >
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)} size={"small"}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)} size={"small"}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },

                ]}
                data={purchaseRequisitions}
                setOpenPopup={setOpenPopup}
                handleDelete={fetchData}
            />
            <Popup title={"Add Purchase Requisition"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseRequisition handleFormSubmit={handleFormSubmit}/>
                {/*<FormPurchaseRequisitions handleFormSubmit={handleFormSubmit}/>*/}
            </Popup>
        </div>
    );
}

export default PurchaseRequisitions
