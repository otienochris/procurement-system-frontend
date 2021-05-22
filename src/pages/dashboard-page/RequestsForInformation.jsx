import React, {useEffect, useState} from 'react';
import {useStyles} from "./Employees";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormRequestForInformation from "./FormRequestForInformaton";
import {getAllRFIs, saveRFI} from "../../services/request-for-information-service";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";

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
                        if(response.ok){
                            alert("Request For information added successfully");
                            setUpdateTable(true);
                        } else{
                            alert("Error adding Request For information")
                        }
                    })
                    .then()
                setUpdateTable(false)
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = (data) => {
        const formData = new FormData()
        formData.append("purchaseOrderId", data.purchaseOrderId)
        formData.append("rfi", data.rfi[0])
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
                    {
                        title: "Request for Information Document", field: "rfiUrl", render: (rowData) => {
                            return <div>
                                <IconButton><ImportContactsIcon/></IconButton>
                                <IconButton><GetAppIcon/></IconButton>
                            </div>
                        }
                    }]}
                data={requestsForInformation}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Add Request for information"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormRequestForInformation handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    )
}

export default RequestsForInformation;