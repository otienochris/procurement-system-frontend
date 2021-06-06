import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const applicationDomainUrl = apiDomain + "/applications/"

export const getAllApplications = async (token) => await
    fetch(applicationDomainUrl, requestHeaderWithoutBodyAfterAuthentication(token));

export const addApplication = async (token, body) => await
    fetch(applicationDomainUrl, requestHeaderWithBodyAfterAuthentication("POST", body,token));

export const deleteApplication = async (token, id) => await
    fetch(applicationDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token));

export const updateApplication = async (token, body, id) =>
    await fetch(applicationDomainUrl + "update/" + id, requestHeaderWithBodyAfterAuthentication("PUT", body, token))

export const approveApplication = async (token, id, status) => await
    fetch(applicationDomainUrl + "approve/" + id + "/" + status, requestHeaderWithBodyAfterAuthentication("PUT", null, token))
