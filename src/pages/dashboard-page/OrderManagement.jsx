import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import Popup from "../../components/customControls/Popup";
import {toast} from "react-toastify";
import {
    addOrderManagementObj,
    deleteOrderManagementObj,
    getAllOrderManagementObjs
} from "../../services/order-management-service";
import FormAddOrderManagementObj from "./forms/FormAddOrderManagementObj";
import {IconButton} from "@material-ui/core";
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
            case "getAllOrderManagementObjs":
                let OM = await getAllOrderManagementObjs(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch();
                setOrderManagementObjs(OM);
                break;
            case "addOrderManagementObj":
                await addOrderManagementObj(token, body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(!updateTable);
                        }
                        return response.ok ?
                            toast.success("Item successfully added", {position: "bottom-right"}) :
                            toast.error("Error adding the item", {position: "bottom-right"})
                    }).then().catch(() => {

                    })
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
            default:
                break
        }
    }

    useEffect(() => {
        fetchData("getAllOrderManagementObjs").then()
    }, [updateTable]);

    const handleFormSubmit = (data) => {

        const formData = new FormData();
        formData.append("purchaseOrderId", data.purchaseOrderId);
        if (data.invoice.length !== 0){
            formData.append("invoice", data.invoice[0]);
        }
        if (data.goodsReceivedNote.length !== 0) {
            formData.append("goodsReceivedNote", data.goodsReceivedNote[0]);
        }
        if (data.goodsReturnShipment.length !== 0) {
            formData.append("goodsReturnShipment", data.goodsReturnShipment[0]);
        }
        fetchData("addOrderManagementObj", formData).then();
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
                                </div> : <CustomButton text={"upload"} />
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
                                </div> : <CustomButton text={"upload"} />
                            )
                        }
                    },
                    {
                        title: "Invoice",
                        field: "invoiceUrl",
                        render: (rowData) => {
                            return (
                                rowData.invoice !== undefined?
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
                                </div>: <CustomButton text={"upload"} />
                            )
                        }

                    }
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