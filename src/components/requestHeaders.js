// domain
// export const apiDomain = "http://192.168.137.1:8080/api/v1";
export const apiDomain = "http://localhost:8080/api/v1";

export const frontEndDomain = "http://192.168.137.1:3000";

// account management urls
export const authenticationUrl = apiDomain + "/users/authenticate";
export const changePasswordUrl = apiDomain + "/users/submitNewPassword";
export const sendChangePasswordTokenUrl = apiDomain + "/users/changePassword";
export const activateAccounturl = apiDomain + "/users/verifyEmail/";

// employees urls
export const employeesDomainUrl = apiDomain + "/employees/";

// suppliers urls
export const suppliersDomainUrl = apiDomain + "/suppliers/";

// departmentHead urls
export const departmentHeadsUrl = apiDomain + "/department-heads/";

// request for quotation urls
export const getAllRequestForQuotations = apiDomain + "/rfqs/";

// request for quotation urls
export const getAllRequestForInfo = apiDomain + "/rfis/";

// solicitation urls
export const getAllSolicitations = apiDomain + "/solicitations/";

// purchase order
export const purchaseOrderDomainUrl = apiDomain + "/purchase-orders/";

export const requestHeaderWithBodyAfterAuthentication = (
  method,
  body,
  token
) => ({
  method,
  mode: "cors",
  headers: {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  },
  body,
});

export const requestHeaderWithJSONBodyAfterAuthentication = (
    method,
    body,
    token
) => ({
  method,
  mode: "cors",
  headers: {
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "Application/json",
  },
  body: JSON.stringify(body),
});

export const requestHeaderWithoutBodyAfterAuthentication = (token) => ({
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

export const requestHeaderWithBodyBeforeAuthentication = (payload) => ({
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "**"
  },
  body: JSON.stringify(payload),
});
