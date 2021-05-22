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
                console.log(requestsForQuotation)
                break;
            case "saveRFQ":
                await saveRFQ(body, token)
                    .then(response => {
                        if(response.ok){
                            setUpdateTable(true)
                            alert("Request for quotation added successful");
                        }else {
                            alert("Error adding Request for Quotation");
                        }
                    })
                    .then()
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
                                <IconButton><ImportContactsIcon/></IconButton>
                                <IconButton><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Terms and Conditions", field: "termsAndConditionDownloadUrl", render: (rowData) => {
                            return <div>
                                <IconButton><ImportContactsIcon/></IconButton>
                                <IconButton><GetAppIcon/></IconButton>
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
