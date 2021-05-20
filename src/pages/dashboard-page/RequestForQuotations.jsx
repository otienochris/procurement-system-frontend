import React, {useState} from 'react'
import {useStyles} from "./Employees";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import FormRequestForQuotation from "./FormRequestForQuotation";

function RequestForQuotations({requestsForQuotations}) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    return (
        <div className={classes.spacingStyle}>
            <CustomMaterialTable
                title={"Request For Quotation"}
                columns={[]}
                data={[]}
                setOpenPopup={setOpenPopup}
            />
            <Popup title={"Add Request for Quotation"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormRequestForQuotation/>
            </Popup>
        </div>
    )
}

export default RequestForQuotations
