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
