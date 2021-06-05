import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const purchaseOrderDomainUrl = apiDomain + "/purchase-orders/";

export const savePO = async (token, body) =>
    await fetch(purchaseOrderDomainUrl ,
        requestHeaderWithBodyAfterAuthentication("POST", body, token))

// fet all purchase orders
export const getAllPO = async (token) =>
    await
        fetch(purchaseOrderDomainUrl,
            requestHeaderWithoutBodyAfterAuthentication(token))
            .then(resp => resp);

// delete purchase order
export const deletePO = async (token, id) =>
    await fetch(purchaseOrderDomainUrl + "delete/" + id,
        requestHeaderWithBodyAfterAuthentication("DELETE", null, token))

// update purchase order
export const updatePO = async (token, body, id) =>
    await fetch(purchaseOrderDomainUrl + "update/" + id, requestHeaderWithBodyAfterAuthentication("PUT", body, token))