import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const purchaseOrderDomainUrl = apiDomain + "/purchase-orders";

export const savePO = async (token, body) => {
    return await fetch(purchaseOrderDomainUrl + "/",
            requestHeaderWithBodyAfterAuthentication("POST", body, token))
}

// fet all purchase orders
export const getAllPO = async (token) => {
    return await
        fetch(purchaseOrderDomainUrl + "/all",
            requestHeaderWithoutBodyAfterAuthentication(token))
            .then(resp => resp);
}


// get purchase order by id


// delete purchase order


// update purchase order
