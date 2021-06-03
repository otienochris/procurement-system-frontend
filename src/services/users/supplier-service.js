import React from "react";
import {
    apiDomain, requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithBodyBeforeAuthentication, requestHeaderWithJSONBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const suppliersDomainUrl = apiDomain + "/suppliers/"

export const saveSupplier = async (body) =>
    await fetch(suppliersDomainUrl + "signup", requestHeaderWithBodyBeforeAuthentication(body));

export const getAllSuppliers = async (token) =>
    await fetch( suppliersDomainUrl, requestHeaderWithoutBodyAfterAuthentication(token))

export const deleteSupplier = async (token, id) =>
    await fetch(suppliersDomainUrl + "delete/" + id, requestHeaderWithBodyAfterAuthentication("DELETE", null, token));

export const updateSupplier = async (token, id, body) =>
    await fetch(suppliersDomainUrl + "update/" + id, requestHeaderWithJSONBodyAfterAuthentication("PUT", body, token));