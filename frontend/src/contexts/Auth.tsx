import React, { PropsWithChildren, useState } from "react";
import UserService from "../services/User";

interface IAuthContext {
  email: string;
  userId: string;
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
  const [email, setEmail] = useState(getEmailFromStorage());
  const [userId, setUserId] = useState(getUserIdFromStorage());
  const [isLoggedIn, setisLoggedIn] = useState(email ? true : false);
  const [authPending, setauthPending] = useState(false);
  const [authError, setauthError] = useState<null | string>(null);

  const signup = async (email: string, password: string) => {
    setauthPending(true);
    setisLoggedIn(false);
    setauthError(null);

    try {
      setauthPending(false);
      const resp = await UserService.signUp(email, password);
      if (resp.error === false) {
        setisLoggedIn(true);
        setEmail(email);
        setUserId(resp.data.id);
        saveEmailtoStorage(email);
      } else {
        setisLoggedIn(false);
        setauthError(resp.data);
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
      if (resp.error === false) {
        setisLoggedIn(true);
        setEmail(email);
        setUserId(resp.data.id);
        saveEmailtoStorage(email);
        saveUserIdtoStorage(resp.data.id);
      } else {
        setisLoggedIn(false);
        setauthError(resp.data);
      }
    } catch (err) {
      setauthError(err as string);
    }
  };

  const logout = () => {
    setEmail("");
    setUserId("");
    setauthPending(false);
    setisLoggedIn(false);
    setauthError(null);
    deleteEmailFromStorage();
    deleteUserIdFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        userId,
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

function deleteEmailFromStorage(): void {
  window.localStorage.removeItem("email");
}

function saveEmailtoStorage(email: string): void {
  window.localStorage.setItem("email", email);
}

function getEmailFromStorage(): string {
  const user = window.localStorage.getItem("email");
  return user || "";
}

function getUserIdFromStorage(): string {
  const user = window.localStorage.getItem("userId");
  return user || "";
}

function saveUserIdtoStorage(userId: string): void {
  window.localStorage.setItem("userId", userId);
}

function deleteUserIdFromStorage(): void {
  window.localStorage.removeItem("userId");
}
