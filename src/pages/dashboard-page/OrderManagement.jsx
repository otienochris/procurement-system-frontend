import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import Popup from "../../components/customControls/Popup";
import {toast} from "react-toastify";
import {
    addOrderManagementObj, approveOrderManagement,
    deleteOrderManagementObj,
    getAllOrderManagementObjs
} from "../../services/order-management-service";
import FormAddOrderManagementObj from "./forms/FormAddOrderManagementObj";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import {openNewWindow} from "./PurchaseRequisitions";
import CustomButton from "../../components/customControls/CustomButton";

const OrderManagement = () => {

    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [orderManagementObjs, setOrderManagementObjs] = useState([]);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                let OM = []
                OM = await getAllOrderManagementObjs(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch();
                setOrderManagementObjs(OM);
                console.log(OM);
                break;
            case "save":
                await addOrderManagementObj(token, body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                        }
                        return response.ok ?
                            toast.success("Item successfully added", {position: "bottom-right"}) :
                            toast.error("Error adding the item", {position: "bottom-right"});
                    }).then().catch(() => toast.info(("Oops! could not connect to the server", {position: "bottom-right"})));

                break
            case "delete":
                await deleteOrderManagementObj(token, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Item deleted successfully", {position: "bottom-right"});
                        } else {
                            toast.error("Error deleting the item", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => {
                        toast.info("Oops! Could not connect to the server");
                    });
                break;
            case "approve":
                await approveOrderManagement(token, body)
                    .then(res => {
                        if (res.ok) {
                            setUpdateTable(!updateTable);
                            toast.success("Item approved successfully", {position: "bottom-right"});
                        } else {
                            toast.error("Error approving the item", {position: "bottom-right"});
                        }
                    })
                    .then()
                    .catch(() => {
                        toast.info("Oops! Could not connect to the server");
                    });
                break
            default:
                break
        }
    }

    useEffect(() => {
        fetchData("getAll").then()
    }, [updateTable]);

    const handleFormSubmit = (data) => {

        const formData = new FormData();
        formData.append("purchaseOrderId", data.purchaseOrderId);
        if (data.invoice.length !== 0) {
            formData.append("invoice", data.invoice[0]);
        }
        if (data.goodsReceivedNote.length !== 0) {
            formData.append("goodsReceivedNote", data.goodsReceivedNote[0]);
        }
        if (data.goodsReturnShipment.length !== 0) {
            formData.append("goodsReturnShipment", data.goodsReturnShipment[0]);
        }
        fetchData("save", formData).then();
    }

    const handleApprovals = (e, id, target) => {
        const body = {id, target, status: e.currentTarget.value};
        fetchData("approve", body).then();
    }

    return (
        <>
            <CustomMaterialTable
                title={"Order Management"}
                columns={[
                    {title: "Serial No.", field: "id"},
                    {title: "Purchase Order Id", field: "purchaseOrderId"},
                    {
                        title: "GRN",
                        field: "goodsReceivedNoteUrl",
                        render: (rowData) => {
                            return (
                                rowData.goodsReceivedNoteUrl ?
                                    <div>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.goodsReceivedNoteUrl)}
                                            size={"small"}
                                        >
                                            <ImportContactsIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.goodsReceivedNoteUrl)}
                                            size={"small"}
                                        >
                                            <GetAppIcon/>
                                        </IconButton>
                                    </div> : <CustomButton text={"upload"}/>
                            )
                        }
                    },
                    {
                        title: "GRS",
                        field: "goodsReturnedShipmentUrl",
                        render: (rowData) => {
                            return (
                                rowData.goodsReturnedShipmentUrl ?
                                    <div>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.goodsReturnedShipmentUrl)}
                                            size={"small"}
                                        >
                                            <ImportContactsIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.goodsReturnedShipmentUrl)}
                                            size={"small"}
                                        >
                                            <GetAppIcon/>
                                        </IconButton>
                                    </div> : <CustomButton text={"upload"}/>
                            )
                        }
                    },
                    {
                        title: "Invoice",
                        field: "invoiceUrl",
                        render: (rowData) => {
                            return (
                                rowData.invoice !== undefined ?
                                    <div>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.invoiceUrl)}
                                            size={"small"}
                                        >
                                            <ImportContactsIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                openNewWindow(rowData.invoiceUrl)}
                                            size={"small"}
                                        >
                                            <GetAppIcon/>
                                        </IconButton>
                                    </div> : <CustomButton text={"upload"}/>
                            )
                        }

                    },
                    {title: "Supplier Approval", field: "supplierApproval", render: (rowData) => {
                        return (
                            rowData.supplierApproval === "PENDING" ?
                            <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                <Button
                                    value={"APPROVED"}
                                    onClick={e => handleApprovals(e, rowData.id, "supplierApproval" )}
                                    color={"primary"}
                                >
                                    approve
                                </Button>
                                <Button
                                    value={"CANCELLED"}
                                    color={"secondary"}
                                    onClick={ e => handleApprovals(e, rowData.id, "supplierApproval" )}
                                    variant={"outlined"}
                                    >cancel</Button>
                            </ButtonGroup>: rowData.supplierApproval === "APPROVED" ?
                                <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                <CancelIcon fontSize={"large"} color={"error"} />
                        )
                        }},
                    {title: "Dept. Head approval", field: "departmentHeadApproval", render: (rowData) => {
                            return (
                                rowData.departmentHeadApproval === "PENDING" ?
                                    <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                        <Button
                                            value={"APPROVED"}
                                            onClick={e => handleApprovals(e, rowData.id, "departmentHeadApproval")}
                                            // style={{backgroundColor: "green", color: "white"}}
                                            color={"primary"}
                                        >
                                            approve
                                        </Button>
                                        <Button
                                            value={"CANCELLED"}
                                            color={"secondary"}
                                            // style={{backgroundColor: "red", color: "white"}}
                                            onClick={ e => handleApprovals(e, rowData.id, "departmentHeadApproval")}
                                            variant={"outlined"}
                                        >cancel</Button>
                                    </ButtonGroup>: rowData.departmentHeadApproval === "APPROVED" ?
                                    <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                    <CancelIcon fontSize={"large"} color={"error"} />
                            )
                        }},
                    {title: "Store manager Approval", field: "storeManagerApproval", render: (rowData) => {
                            return (
                                rowData.storeManagerApproval === "PENDING" ?
                                    <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                        <Button
                                            value={"APPROVED"}
                                            onClick={e => handleApprovals(e, rowData.id, "storeManagerApproval")}
                                            color={"primary"}
                                        >
                                            approve
                                        </Button>
                                        <Button
                                            value={"CANCELLED"}
                                            color={"secondary"}
                                            // style={{backgroundColor: "red", color: "white"}}
                                            onClick={ e => handleApprovals(e, rowData.id, "storeManagerApproval")}
                                            variant={"outlined"}
                                        >cancel</Button>
                                    </ButtonGroup>: rowData.storeManagerApproval === "APPROVED" ?
                                    <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                    <CancelIcon fontSize={"large"}  color={"error"} />
                            )
                        }},
                    {title: "Procurement Officer Approval", field: "procurementOfficerApproval", render: (rowData) => {
                            return (
                                rowData.procurementOfficerApproval === "PENDING" ?
                                    <ButtonGroup size={"small"} orientation={"vertical"} variant={"outlined"}>
                                        <Button
                                            value={"APPROVED"}
                                            onClick={e => handleApprovals(e, rowData.id, "procurementOfficerApproval")}
                                            color={"primary"}
                                        >
                                            approve
                                        </Button>
                                        <Button
                                            value={"CANCELLED"}
                                            color={"secondary"}
                                            onClick={ e => handleApprovals(e, rowData.id, "procurementOfficerApproval")}
                                            variant={"outlined"}
                                        >cancel</Button>
                                    </ButtonGroup>: rowData.procurementOfficerApproval === "APPROVED" ?
                                    <CheckCircleIcon fontSize={"large"} style={{color: "green"}} color={"action"} /> :
                                    <CancelIcon fontSize={"large"} style={{color: "red"}} color={"error"} />
                            )
                        }}
                ]}
                data={orderManagementObjs}
                handleDelete={fetchData}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Manage Order"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormAddOrderManagementObj handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </>
    )
}

export default OrderManagement;