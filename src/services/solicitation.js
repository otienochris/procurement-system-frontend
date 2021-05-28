import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication, requestHeaderWithJSONBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const solicitationsDomainUrl = apiDomain + "/solicitations"

export const getAllSolicitations = async (token) => await
    fetch(solicitationsDomainUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token));

export const addSolicitation = async (token, body) =>  await
    fetch(solicitationsDomainUrl + "/", requestHeaderWithJSONBodyAfterAuthentication("POST", body, token));
export const deleteSolicitation = async (token, id) =>  await
    fetch(solicitationsDomainUrl + "/delete/" + id, requestHeaderWithJSONBodyAfterAuthentication("DELETE", null, token));
