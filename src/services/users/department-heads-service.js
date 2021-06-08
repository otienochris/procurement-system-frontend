import {
    apiDomain, requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithBodyBeforeAuthentication, requestHeaderWithJSONBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const headsOfDepartmentUrl = apiDomain + "/department-heads/";

export const getAllDepartmentHeads = async (token) => {
    return await fetch(headsOfDepartmentUrl , requestHeaderWithoutBodyAfterAuthentication(token))
}

export const saveDepartmentHead = async (body) => {
    return await fetch(headsOfDepartmentUrl + "signup", requestHeaderWithBodyBeforeAuthentication(body))
}

export const deleteDepartmentHead = async (token, id) =>
    await fetch(headsOfDepartmentUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token))

export const updateDepartmentHead = async (token, id, body) =>
    await fetch(headsOfDepartmentUrl + "update/" + id, requestHeaderWithJSONBodyAfterAuthentication("PUT",body, token));

export const getDepartmentHeadByUsername = async (token, username) => await
    fetch(headsOfDepartmentUrl + username, requestHeaderWithoutBodyAfterAuthentication(token))