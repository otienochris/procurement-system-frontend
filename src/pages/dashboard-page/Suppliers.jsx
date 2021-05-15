import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import {
  requestHeaderWithoutBodyAfterAuthentication,
  suppliersDomainUrl,
} from "../../components/requestHeaders";
import { useStyles } from "./Employees";
import SupplierSignUp from "../signup-page/SupplierSignUp";
import CustomPaper from "../../components/customControls/CustomPaper";

function Suppliers({ suppliers, setSuppliers }) {
  const token = useSelector((state) => state.token);
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  return (
    <>
      <div className={classes.spacingStyle}>
        <CustomMaterialTable
          title="Suppliers"
          columns={[
            { title: "KRA", field: "kra" },
            { title: "NAME", field: "name" },
            { title: "DESCRIPTION", field: "description" },
            {
              title: "STATUS",
              lookup: { false: "Disabled", true: "Active" },
              field: "isAccountActive",
              default: "false",
              editable: false,
              defaultGroupOrder: 0,
            },
          ]}
          setOpenPopup={setOpenPopup}
          data={suppliers}
          setData={setSuppliers}
        />
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Supplier" >
          <SupplierSignUp />
      </Popup>
    </>
  );
}

export default Suppliers;
