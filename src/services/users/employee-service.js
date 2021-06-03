import {
    apiDomain, requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithBodyBeforeAuthentication, requestHeaderWithJSONBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const employeeDomainUrl = apiDomain + "/employees/"

export const saveEmployee = async (body) =>
    await fetch(employeeDomainUrl + "signup", requestHeaderWithBodyBeforeAuthentication(body));

export const deleteEmployee = async (token, id) =>
    await fetch(employeeDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE",null, token));

export const getAllEmployees = async (token) =>
    await fetch(employeeDomainUrl , requestHeaderWithoutBodyAfterAuthentication(token))

export const updateEmployee = async (token, id, body) =>
    await fetch(employeeDomainUrl + "update/" + id, requestHeaderWithJSONBodyAfterAuthentication("PUT", body, token))