import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const ContractDomainUrl = apiDomain + "/contracts/"

export const getAllContracts = async (token) => await
    fetch(ContractDomainUrl, requestHeaderWithoutBodyAfterAuthentication(token));

export const addContract = async (token, body) => await
    fetch(ContractDomainUrl, requestHeaderWithBodyAfterAuthentication("POST", body, token));

export const deleteContract = async (token, id) => await
    fetch(ContractDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token));