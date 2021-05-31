import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import {useStyles} from "./Employees";
import FormPurchaseOrder from "./forms/FormPurchaseOrder";
import {deletePO, getAllPO, savePO} from "../../services/purchase-order-service";
import {useSelector} from "react-redux";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import GetAppIcon from '@material-ui/icons/GetApp';
import {IconButton} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";
import {openNewWindow} from "./PurchaseRequisitions";

const PurchaseOrders = () => {
    const classes = useStyles();
    const token = useSelector(state => state.token)
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false)

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllPO":
                const po = await getAllPO(token).then(resp => resp).then(resp => resp.json());
                setPurchaseOrders(po)
                break
            case "savePO":
                await savePO(token, body).then(response => {
                    if (response.ok) {
                        setUpdateTable(true);
                        setOpenPopup(false);
                        toast.success("Purchase Order added successfully", toastOptions);
                    } else {
                        setOpenPopup(false);
                        toast.error("Error Saving Purchase Order", toastOptions);
                    }
                }).then().catch(reason => {
                    toast.info("Oops! Could not connect to the server", toastOptions)
                })
                setUpdateTable(false)
                break;
            case "delete":
                await deletePO(token, body)
                    .then(response => {
                        if (response.ok){
                            setUpdateTable(!updateTable);
                        }
                        return response.ok
                            ? toast.success("Successfully deleted the item", {position: "bottom-right"})
                            : toast.error("Error deleting purchase order")
                    })
                    .then()
                    .catch(reason => toast.info("Oops! Could not connect to the server"));
                break;
            default:
                break
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        console.log(data);
        formData.append("rfpTemplate", data.rfpTemplate[0]);
        formData.append("rfiTemplate", data.rfiTemplate[0]);
        formData.append("termsAndConditions", data.termsAndConditions[0]);
        formData.append("purchaseRequisitionId", data.purchaseRequisitionId);
        formData.append("description", data.description);

        console.log(formData.get("termsAndConditions"));
        fetchData("savePO", formData).then()
    };

    useEffect(() => {
        fetchData("getAllPO").then()
    }, [updateTable])

    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Purchase Orders"
                columns={[
                    {title: "Serial No", field: "id"},
                    {title: "Purchase Requisition Id", field: "purchaseRequisitionId"},
                    {
                        title: "description",
                        field: "description",
                        render: rowData => rowData.description ? rowData.description : "Empty"
                    },
                    {
                        title: "Status", field: "status", render: (rowData) => {
                            if (rowData.status === "PENDING" || rowData === "PENDING") {
                                return <CustomButton color={"default"} text={rowData.status || rowData}/>
                            } else if (rowData.status === "CANCEllED" || rowData === "CANCEllED") {
                                return <CustomButton text={rowData.status || rowData} style={{backgroundColor: "red"}}/>
                            } else if (rowData.status === "APPROVED" || rowData === "APPROVED") {
                                return <CustomButton text={rowData.status || rowData}
                                                     style={{backgroundColor: "green"}}/>
                            }
                        }
                    },
                    {
                        title: "Date Created",
                        field: "dataCreated",
                        render: (rowData => new Date(rowData.dataCreated).toDateString())
                    },
                    {
                        title: "RFI Document", field: "rfiTemplateDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.rfiTemplateDownloadUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.rfiTemplateDownloadUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },
                    {
                        title: "RFP Document", field: "rfpTemplateDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.rfpTemplateDownloadUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.rfpTemplateDownloadUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },
                    {
                        title: "T&C Document", field: "termsAndConditions", render: (rowData) => {
                            return <div>
                                <IconButton onClick={() => openNewWindow(rowData.termsAndConditions)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.termsAndConditions)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    }

                ]}
                data={purchaseOrders}
                setOpenPopup={setOpenPopup}
                handleDelete={fetchData}
            />
            <Popup title="Add Purchase Order" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseOrder handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    );
};

export default PurchaseOrders;
