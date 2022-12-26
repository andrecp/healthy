import axios from "axios";
import React, { PropsWithChildren, useState } from "react";
import UserService from "../services/User";

interface IAuthContext {
  email: string;
  userId: string;
  jwtRefresh: string;
  jwtAccess: string;
  authPending: boolean;
  isLoggedIn: boolean;
  authError: null | string;
  signup: (arg1: string, arg2: string) => void;
  login: (arg1: string, arg2: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export const ContextProvider = (props: PropsWithChildren<{}>) => {
  const [email, setEmail] = useState(
    window.localStorage.getItem("email") || ""
  );
  const [userId, setUserId] = useState(
    window.localStorage.getItem("userId") || ""
  );
  const [jwtRefresh, setjwtRefresh] = useState(
    window.localStorage.getItem("jwtRefresh") || ""
  );
  const [jwtAccess, setjwtAccess] = useState(
    window.localStorage.getItem("jwtAccess") || ""
  );
  const [isLoggedIn, setisLoggedIn] = useState(email ? true : false);
  const [authPending, setauthPending] = useState(false);
  const [authError, setauthError] = useState<null | string>(null);

  // Add Authorization Bearer by default
  if (jwtAccess) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtAccess}`;

    // If a return value returns 406, try to refresh the access token
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 406 && !originalRequest._retry) {
          originalRequest._retry = true;
          const resp = await UserService.refreshAccessToken(jwtRefresh);
          const access_token = resp.access_token;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + access_token;
          setjwtAccess(access_token || "");
          window.localStorage.setItem("jwtAccess", access_token || "");
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  const signup = async (email: string, password: string) => {
    setauthPending(true);
    setisLoggedIn(false);
    setauthError(null);

    try {
      setauthPending(false);
      const resp = await UserService.signUp(email, password);
      if (resp.error === false && resp.access_token && resp.refresh_token) {
        setisLoggedIn(true);
        const jwtRaw = JSON.parse(parseJwt(resp.access_token).sub);

        setEmail(jwtRaw.email);
        setUserId(jwtRaw.id);
        setjwtAccess(resp.access_token);
        setjwtRefresh(resp.refresh_token);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("userId", jwtRaw.id);
        window.localStorage.setItem("jwtRefresh", resp.refresh_token);
        window.localStorage.setItem("jwtAccess", resp.access_token);
      } else {
        setisLoggedIn(false);
        setauthError(resp.text || "");
      }
    } catch (err) {
      setauthError(err as string);
    }
  };

  const login = async (email: string, password: string) => {
    setauthPending(true);
    setisLoggedIn(false);
    setauthError(null);

    try {
      setauthPending(false);
      const resp = await UserService.login(email, password);
      if (resp.error === false && resp.access_token && resp.refresh_token) {
        setisLoggedIn(true);
        const jwtRaw = JSON.parse(parseJwt(resp.access_token).sub);
        console.log(jwtRaw);
        console.log(resp);
        setEmail(jwtRaw.email);
        setUserId(jwtRaw.id);
        setjwtAccess(resp.access_token);
        setjwtRefresh(resp.refresh_token);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("userId", jwtRaw.id);
        window.localStorage.setItem("jwtRefresh", resp.refresh_token);
        window.localStorage.setItem("jwtAccess", resp.access_token);
      } else {
        setisLoggedIn(false);
        setauthError(resp.text || "");
      }
    } catch (err) {
      setauthError(err as string);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("jwtRefresh");
    window.localStorage.removeItem("jwtAccess");
    setEmail("");
    setUserId("");
    setauthPending(false);
    setisLoggedIn(false);
    setauthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        userId,
        jwtAccess,
        jwtRefresh,
        authError,
        authPending,
        isLoggedIn,
        signup,
        login,
        logout,
      }}
      {...props}
    />
  );
};

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
