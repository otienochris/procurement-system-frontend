import {
    apiDomain,
    requestHeaderWithBodyBeforeAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const headsOfDepartmentUrl = apiDomain + "/department-heads";

export const getAllDepartmentHeads = async (token) => {
    return await fetch(headsOfDepartmentUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token))
}

export const saveDepartmentHead = async (body) => {
    return await fetch(headsOfDepartmentUrl + "/signup", requestHeaderWithBodyBeforeAuthentication(body))
}