import React, { PropsWithChildren, useState } from "react";
import UserService from "../services/User";

interface IAuthContext {
  user: string;
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
  const [user, setUser] = useState(getUserFromStorage());
  const [isLoggedIn, setisLoggedIn] = useState(user ? true : false);
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
        setUser(email);
        saveUsertoStorage(email);
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
        setUser(email);
        saveUsertoStorage(email);
      } else {
        setisLoggedIn(false);
        setauthError(resp.data);
      }
    } catch (err) {
      setauthError(err as string);
    }
  };

  const logout = () => {
    setUser("");
    setauthPending(false);
    setisLoggedIn(false);
    setauthError(null);
    deleteUserFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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

function deleteUserFromStorage(): void {
  window.localStorage.removeItem("user");
}

function saveUsertoStorage(email: string): void {
  window.localStorage.setItem("user", email);
}

function getUserFromStorage(): string {
  const user = window.localStorage.getItem("user");
  return user || "";
}
