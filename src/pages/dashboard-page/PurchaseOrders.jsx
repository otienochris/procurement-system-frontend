import React from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import { useStyles } from "./Employees";

const PurchaseOrders = ({ purchaseOrders }) => {
  const classes = useStyles();
  return (
    <div className={classes.spacingStyle}>
      <CustomMaterialTable
        title="Purchase Orders"
        columns={[]}
        data={purchaseOrders}
      />
    </div>
  );
};

export default PurchaseOrders;
