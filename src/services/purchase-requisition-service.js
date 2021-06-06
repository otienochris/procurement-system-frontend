import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";


const purchaseRequisitionDomainUrl = apiDomain + "/purchase-requisitions/";

export const savePurchaseRequisition = async (token, body) =>
    await
        fetch(purchaseRequisitionDomainUrl ,requestHeaderWithBodyAfterAuthentication("POST", body, token))


export const getAllPurchaseRequisitions = async (token) =>
    await
        fetch(purchaseRequisitionDomainUrl,
            requestHeaderWithoutBodyAfterAuthentication(token))

export const deletePurchaseRequisition = async (token, id) =>
    await fetch(purchaseRequisitionDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", "", token))

export const updatePurchaseRequisition = async (token, body, id) =>
    await fetch(purchaseRequisitionDomainUrl + "update/" + id, requestHeaderWithBodyAfterAuthentication("PUT", body, token));

export const approvePurchaseRequisition = async (token, id, status) => await
    fetch(purchaseRequisitionDomainUrl + "approve/" + id + "/" + status, requestHeaderWithBodyAfterAuthentication("PUT", null, token));
