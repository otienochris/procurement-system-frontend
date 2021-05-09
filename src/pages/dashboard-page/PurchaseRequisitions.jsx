import React from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable';
import {useStyles} from "./Employees"

function PurchaseRequisitions({purchaseRequisitions}) {
    const classes = useStyles()
    return (
      <div className={classes.spacingStyle}>
        <CustomMaterialTable
          title="Purchase Requisition"
          columns={[]}
          data={purchaseRequisitions}
          options={{
            filtering: true,
            exportButton: true,
          }}
        />
      </div>
    );
}

export default PurchaseRequisitions
