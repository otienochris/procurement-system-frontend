import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import {useStyles} from "./Employees";
import FormPurchaseOrder from "./FormPurchaseOrder";
import {getAllPO, savePO} from "../../services/purchase-order-service";
import {useSelector} from "react-redux";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import GetAppIcon from '@material-ui/icons/GetApp';
import {IconButton} from "@material-ui/core";
import CustomButton from "../../components/customControls/CustomButton";

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
                        setOpenPopup(false)
                        alert("Purchase Order added successfully");

                    } else {
                        setOpenPopup(false);
                        alert("Error Saving Purchase Order");
                    }
                }).then()
                setUpdateTable(false)
                break
            default:
                break
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("rfpTemplate", data.rfpTemplate[0]);
        formData.append("rfiTemplate", data.rfiTemplate[0]);
        formData.append("purchaseRequisitionId", data.purchaseRequisitionId);
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
                        title: "RFI Document", field: "rfiTemplateDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton><ImportContactsIcon/></IconButton>
                                <IconButton><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "RFP Document", field: "rfpTemplateDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton><ImportContactsIcon/></IconButton>
                                <IconButton><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Status", field: "status", defaultGroupOrder: 0, render: (rowData) => {
                            console.log(rowData)
                            if (rowData.status === "PENDING" || rowData === "PENDING") {
                                return <CustomButton color={"default"} text={rowData.status || rowData}/>
                            } else if (rowData.status === "CANCEllED" || rowData ===  "CANCEllED") {
                                return <CustomButton text={rowData.status || rowData} style={{backgroundColor: "red"}}/>
                            } else if (rowData.status === "APPROVED" || rowData === "APPROVED") {
                                return <CustomButton text={rowData.status || rowData} style={{backgroundColor: "green"}}/>
                            }
                        }
                    },
                    {title: "Date Created", field: "dataCreated"}
                ]}
                data={purchaseOrders}
                setOpenPopup={setOpenPopup}
            />
            <Popup title="Add Purchase Order" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseOrder handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    );
};

export default PurchaseOrders;
