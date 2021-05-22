import {
    apiDomain,
    requestHeaderWithBodyBeforeAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const employeeDomainUrl = apiDomain + "/employees"

export const saveEmployee = async (body) =>
    await fetch(employeeDomainUrl + "/signup", requestHeaderWithBodyBeforeAuthentication(body))

export const getAllEmployees = async (token) =>
    await fetch(employeeDomainUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token))

