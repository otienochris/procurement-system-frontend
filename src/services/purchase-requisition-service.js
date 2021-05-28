import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";


const purchaseRequisitionDomainUrl = apiDomain + "/purchase-requisitions";

export const savePurchaseRequisition = async (token, body) => {
    return await
        fetch(purchaseRequisitionDomainUrl + "/",
            requestHeaderWithBodyAfterAuthentication("POST", body, token))
}

export const getAllPurchaseRequisitions = async (token) => {
    return await
        fetch(purchaseRequisitionDomainUrl + "/",
            requestHeaderWithoutBodyAfterAuthentication(token))
}

export const deletePurchaseRequisition = async (token, id) => {
    return await fetch(purchaseRequisitionDomainUrl + "/delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", "", token))
}