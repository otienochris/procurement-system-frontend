import React, {useEffect, useState} from 'react'
import {useStyles} from "./Employees";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormRequestForQuotation from "./FormRequestForQuotation";
import {useSelector} from "react-redux";
import {getAllRFQs, saveRFQ} from "../../services/request-for-quotation-service";
import {IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";
import {toast} from "react-toastify";
import {openNewWindow} from "./PurchaseRequisitions";
import {toastOptions} from "../../App";

function RequestForQuotations() {
    const classes = useStyles();
    const [requestsForQuotation, setRequestsForQuotations] = useState([]);
    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false)

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllRFQs":
                const RFQs = await getAllRFQs(token).then(response => response).then(result => result.json());
                setRequestsForQuotations(RFQs);
                break;
            case "saveRFQ":
                await saveRFQ(body, token)
                    .then(response => {
                        if(response.ok){
                            setUpdateTable(true);
                            setOpenPopup(false);
                            toast.success("Request for quotation added successful", toastOptions);
                        }else {
                            setOpenPopup(false);
                            toast.error("Error adding Request for Quotation", toastOptions);
                        }
                    })
                    .then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions)
                    })
                setUpdateTable(false);
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
        formData.append("termsAndConditions", data.termsAndConditionsDocument[0]);
        fetchData("saveRFQ", formData).then()
    }

    useEffect(() => {
        fetchData("getAllRFQs").then()
    }, [updateTable])

    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title={"Request For Quotation"}
                columns={[
                    {title: "Serial Number", field: "id"},
                    {title: "Purchase Order Id", field: "purchaseOrderId"},
                    {title: "Description", field: "description"},
                    {
                        title: "Quotation Document", field: "quotationDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={()=> openNewWindow(rowData.quotationDownloadUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={()=> openNewWindow(rowData.quotationDownloadUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Terms and Conditions", field: "termsAndConditionDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton onClick={()=> openNewWindow(rowData.termsAndConditionDownloadUrl)}>
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton onClick={()=> openNewWindow(rowData.termsAndConditionDownloadUrl)}>
                                    <GetAppIcon/>
                                </IconButton>
                            </div>
                        }
                    },
                    {title: "Date Created", field: "dateCreated"}
                ]}
                data={requestsForQuotation}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Add Request for Quotation"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormRequestForQuotation handleFormSubmit={handleFormSubmit} />
            </Popup>
        </div>
    )
}

export default RequestForQuotations
