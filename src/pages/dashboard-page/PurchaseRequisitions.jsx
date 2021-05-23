import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees";
import Popup from "../../components/customControls/Popup";
import FormPurchaseRequisition from "./FormPurchaseRequisition";
import {getAllPurchaseRequisitions, savePurchaseRequisition} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GetAppIcon from "@material-ui/icons/GetApp";

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
                        alert("Purchase Requisition added successfully");
                    } else {
                        setOpenPopup(false);
                        alert("error adding purchase requisition");
                    }
                    setUpdateTable(false)
                }).then()
                break
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
    }, [updateTable])



    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Purchase Requisition"
                columns={[
                    {title: "Serial Number", field: "id"},
                    {title: "Description", field: "description"},
                    {
                        title: "Need Document", field: "needDocumentUrl", render: (rowData) => {
                            return <div className={classes.fileButtons}>
                                <IconButton
                                    onClick={() => openNewWindow(rowData.needDocumentUrl)}
                                ><ImportContactsIcon/></IconButton>
                                <IconButton
                                    onClick={() => openNewWindow(rowData.needDocumentUrl)}
                                ><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Analysis Document", field: "analysisDocumentUrl", render: (rowData) => {
                            console.log(rowData);
                            return <div className={classes.fileButtons}>
                                <IconButton
                                onClick={() => openNewWindow(rowData.analysisDocumentUrl)}
                                >
                                    <ImportContactsIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => openNewWindow(rowData.analysisDocumentUrl)}
                                ><GetAppIcon/></IconButton>
                            </div>
                        }
                    },
                    {
                        title: "Emergency Document", field: "emergencyDocumentUrl", render: (rowData) => {
                            return <div className={classes.fileButtons}>
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)}><ImportContactsIcon/></IconButton>
                                <IconButton onClick={() => openNewWindow(rowData.emergencyDocumentUrl)}><GetAppIcon/></IconButton>
                            </div>
                        }
                    },

                ]}
                data={purchaseRequisitions}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Add Purchase Requisition"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseRequisition handleFormSubmit={handleFormSubmit}/>
                {/*<FormPurchaseRequisitions handleFormSubmit={handleFormSubmit}/>*/}
            </Popup>
        </div>
    );
}

export default PurchaseRequisitions
