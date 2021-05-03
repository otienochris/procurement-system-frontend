export const authenticationUrl =
  "http://192.168.137.1:8080/api/v1/users/authenticate";
export const changePasswordUrl =
  "http://192.168.137.1:8080/api/v1/users/submitNewPassword";
export const sendChangePasswordTokenUrl =
  "http://192.168.137.1:8080/api/v1/users/changePassword";
export const activateAccounturl =
  "http://192.168.137.1:8080/api/v1/users/verifyEmail/";
export const employeesDomainUrl = "http://192.168.137.1:8080/api/v1/employees/";

export const requestHeaderWithBodyAfterAuthentication = (payload, token) => ({
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify(payload),
});

export const requestHeaderWithoutBodyAfterAuthentication = (token) => ({
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

export const requestHeaderWithBodyBeforeAuthentication = (payload) => ({
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
