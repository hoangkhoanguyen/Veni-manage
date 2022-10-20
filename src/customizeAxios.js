import axios from "axios";
import cookieService from "service/cookieService";
// import _ from "lodash";
// import { clearUserInfo, setLogin } from "./redux/reducers/userReducer";
// import cookieService from "./services/cookieService";
// import store, { dispatch } from "./redux/store";
// import { path } from "./constant";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  withCredentials: true,
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = "") => {
  const error = new Error();
  error.httpStatusCode = httpStatusCode;
  error.statusCode = statusCode;
  error.errorMessage = errorMessage;
  error.problems = problems;
  error.errorCode = errorCode;
  return error;
};

export const isSuccessStatusCode = (s) => {
  // May be string or number
  const statusType = typeof s;
  return (
    (statusType === "number" && s === 0) || (statusType === "string" && s.toUpperCase() === "OK")
  );
};

instance.interceptors.request.use((config) => {
  const cf = config;
  cf.headers["x-access-token"] = cookieService.get("accessToken");
  cf.headers["x-refresh-token"] = cookieService.get("refreshToken");
  return cf;
});

instance.interceptors.response.use(
  (response) => {
    // Thrown error for request with OK status code
    const { data } = response;
    // if (
    //   data.hasOwnProperty("s") &&
    //   !isSuccessStatusCode(data["s"]) &&
    //   data.hasOwnProperty("errmsg")
    // ) {
    //   return Promise.reject(
    //     createError(
    //       response.status,
    //       data["s"],
    //       data["errmsg"],
    //       null,
    //       data["errcode"] ? data["errcode"] : ""
    //     )
    //   );
    // }

    // Return direct data to callback
    // if (data.hasOwnProperty("s") && data.hasOwnProperty("d")) {
    //   return data["d"];
    // }
    // // Handle special case
    // if (data.hasOwnProperty("s") && _.keys(data).length === 1) {
    //   return null;
    // }

    if (data?.data?.accessToken) {
      cookieService.set("accessToken", data.data.accessToken);
    }

    if (data?.data?.refreshToken) {
      cookieService.set("refreshToken", data.data.refreshToken);
    }

    // if (data && data.errMsg == "Refresh token was expired. Please re-login!") {
    //   window.location.href = path.LOGIN;
    // }

    return data;
  },
  async (error) => {
    const { response } = error;
    // const originalConfig = error.config;
    if (response == null) {
      return Promise.reject(error);
    }

    // if (response && response.status == 403) {
    //   //access token expired
    //   console.log("expired access");
    //   try {
    //     const state = store.getState();
    //     let userId = state.user.userInfo.userId;
    //     console.log("userId :", userId);
    //     if (!userId) {
    //       window.location.href = path.LOGIN;
    //     }
    //     let result = await getNewAccessToken(userId);
    //     if (result) {
    //       return instance(originalConfig);
    //     }
    //     return Promise.reject(error);
    //   } catch (err) {
    //     console.log(err);
    //     return Promise.reject(err);
    //   }
    // }

    // if (response && response.status == 400) {
    //   dispatch(clearUserInfo());
    //   dispatch(setLogin(false));
    //   window.location.href = path.LOGIN;
    // }

    // const { data } = response;

    // if (data.hasOwnProperty("s") && data.hasOwnProperty("errmsg")) {
    //   return Promise.reject(createError(response.status, data["s"], data["errmsg"]));
    // }

    // if (data.hasOwnProperty("code") && data.hasOwnProperty("message")) {
    //   return Promise.reject(
    //     createError(response.status, data["code"], data["message"], data["problems"])
    //   );
    // }

    return Promise.reject(createError(response.status));
  }
);

// const getNewAccessToken = async (userId) => {
//   try {
//     let body = {
//       userId,
//     };
//     console.log(userId);
//     let result = await instance.post(`/api/token/get-new-token-by-refresh-token`, body);

//     // if (result && result.errCode !== 0) {

//     //     dispatch(clearUserInfo())
//     //     dispatch(setLogin(false))
//     // }
//     // if (result && result.errCode === 0) {
//     //     console.log('new token',result.data.accessToken)
//     // }
//     if (result) {
//       if (result.errCode === 0) {
//         console.log("new token", result.data.accessToken);
//         return true;
//       }
//       if (result.errCode !== 0) {
//         dispatch(clearUserInfo());
//         dispatch(setLogin(false));
//         return false;
//       }
//     }
//     // return null
//   } catch (error) {
//     console.log(error);
//     // return null
//   }
// };

export default instance;
