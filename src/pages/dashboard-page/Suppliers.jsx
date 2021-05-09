import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {
  requestHeaderWithoutBodyAfterAuthentication,
  suppliersDomainUrl,
} from "../../components/requestHeaders";
import { useStyles } from "./Employees";

function Suppliers({ suppliers, setSuppliers }) {
  const token = useSelector((state) => state.token);
  const classes = useStyles();
  return (
    <div className={classes.spacingStyle}>
      <CustomMaterialTable
        title="Suppliers"
        columns={[
          { title: "KRA", field: "kra" },
          { title: "NAME", field: "name" },
          { title: "DESCRIPTION", field: "description" },
          { 
            title: "STATUS",
            lookup:{false:"Disabled", true:"Active"},
            field: "isAccountActive",
            default: "false",
            editable: false,
            defaultGroupOrder: 0
          },
        ]}
        data={suppliers}
        setData={setSuppliers}
      />
    </div>
  );
}

export default Suppliers;
