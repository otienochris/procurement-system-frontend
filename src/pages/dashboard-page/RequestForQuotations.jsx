import React from 'react'
import CustomPaper from '../../components/customControls/CustomPaper'
import RequestForQuotation from "./RequestForQuotation";

function RequestForQuotations({requestsForQuotations}) {
    return (
        <CustomPaper>
            <h1>Requests for quotation</h1>
            {requestsForQuotations.map(rfq => {
                
            })}
        </CustomPaper>
    )
}

export default RequestForQuotations
