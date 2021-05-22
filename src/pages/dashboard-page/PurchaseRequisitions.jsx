import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees"
import Popup from "../../components/customControls/Popup";
import FormPurchaseRequisition from "./FormPurchaseRequisition";
import {getAllPurchaseRequisitions, savePurchaseRequisition} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";

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
                        setUpdateTable(true)
                        alert("Purchase Requisition added successfully");
                    } else {
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
        formData.append("acquisitionDocument", data.acquisitionDocument[0]);
        formData.append("needDocument", data.needDocument[0]);
        formData.append("analysisDocument", data.analysisDocument[0]);
        formData.append("emergencyDocument", data.emergencyDocument[0]);
        fetchData("savePurchaseRequisition", formData).then()

    }

    useEffect(() => {
        fetchData("getAllPurchaseRequisitions").then()
    }, [updateTable])

    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title="Purchase Requisition"
                columns={[]}
                data={purchaseRequisitions}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Add Purchase Requisition"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormPurchaseRequisition handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </div>
    );
}

export default PurchaseRequisitions
