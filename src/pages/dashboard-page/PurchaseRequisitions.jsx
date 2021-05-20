import React, {useEffect, useState} from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees"
import Popup from "../../components/customControls/Popup";
import FormPurchaseRequisition from "./FormPurchaseRequisition";
import {getAllPurchaseRequisitions} from "../../services/purchase-requisition-service";
import {useSelector} from "react-redux";

function PurchaseRequisitions() {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const token = useSelector(state => state.token);
    const [purchaseRequisitions, setPurchaseRequisitions] = useState()

    const fetchData = async (type) => {
        switch (type){
            case "getAllPurchaseRequisitions":
                const PR = await getAllPurchaseRequisitions(token).then(resp => resp)
                    .then(result => result.json());
                setPurchaseRequisitions(PR)
                break
            default:
                break
        }
    }

    useEffect(()=> {
        fetchData("getAllPurchaseRequisitions").then()
    }, [])

    return (
      <div className={classes.spacingStyle}>
        <CustomMaterialTable
          title="Purchase Requisition"
          columns={[]}
          data={purchaseRequisitions}
          setOpenPopup={setOpenPopup}
        />
        <Popup title={"Add Purchase Requisition"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <FormPurchaseRequisition/>
        </Popup>
      </div>
    );
}

export default PurchaseRequisitions
