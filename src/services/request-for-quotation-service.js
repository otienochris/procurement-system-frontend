import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const requestForQuotationUrl = apiDomain + "/rfqs"

export const getAllRFQs = async (token) => {
    return await fetch(requestForQuotationUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token))
}

export const saveRFQ = async (body, token) => {
    return await fetch(requestForQuotationUrl + "/", requestHeaderWithBodyAfterAuthentication("POST", body, token))
}

export const deleteRFQ = async (token, id) => {
    return await fetch(requestForQuotationUrl + "/delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token))
}