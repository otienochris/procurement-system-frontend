import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const orderManagementDomainUrl = apiDomain + "/order-management/"

export const getAllOrderManagementObjs = async (token) => await
    fetch(orderManagementDomainUrl, requestHeaderWithoutBodyAfterAuthentication(token));

export const addOrderManagementObj = async (token, body) => await
    fetch(orderManagementDomainUrl, requestHeaderWithBodyAfterAuthentication("POST", body, token));

export const deleteOrderManagementObj = async (token, id) => await
    fetch(orderManagementDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token));
