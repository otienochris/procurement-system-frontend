import React from "react";
import {
    apiDomain,
    requestHeaderWithBodyBeforeAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../../components/requestHeaders";

const suppliersDomainUrl = apiDomain + "/suppliers"

export const saveSupplier = async (body) =>
    await fetch(suppliersDomainUrl + "/signup", requestHeaderWithBodyBeforeAuthentication(body));

export const getAllSuppliers =
    async (token) => await fetch( suppliersDomainUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token))