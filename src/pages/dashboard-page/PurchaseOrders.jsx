import React, { useState } from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import { useStyles } from "./Employees";
import FormPurchaseOrder from "./FormPurchaseOrder";

const PurchaseOrders = ({ purchaseOrders }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div className={classes.spacingStyle}>
      <CustomMaterialTable
        title="Purchase Orders"
        columns={[]}
        data={purchaseOrders}
        setOpenPopup={setOpenPopup}
      />
      <Popup title="Add Purchase Order" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <FormPurchaseOrder />
      </Popup>
    </div>
  );
};

export default PurchaseOrders;
