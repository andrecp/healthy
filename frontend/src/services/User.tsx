import axios from "axios";

import type { IAuthResponse } from "./Utils";

const baseURL = "http://localhost/v1/users";

async function doAuth(
  method: string,
  email: string,
  password: string
): Promise<IAuthResponse> {
  try {
    const rawResponse = await axios.post(`${baseURL}/${method}`, {
      email,
      password,
    });
    const response: IAuthResponse = {
      access_token: rawResponse.data.access_token,
      refresh_token: rawResponse.data.refresh_token,
      error: false,
    };
    return response;
  } catch (err) {
    let errorResponse = { error: true } as IAuthResponse;
    if (axios.isAxiosError(err)) {
      if (!err?.response) {
        errorResponse.text = "No Server Response";
      } else if (err.response?.status === 400) {
        errorResponse.text = err.response.data.detail;
      } else {
        errorResponse.text = "Signup failed";
      }
    }
    return errorResponse;
  }
}

const UserService = {
  signUp: async function (
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    return await doAuth("signup", email, password);
  },
  login: async function (
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    return await doAuth("login", email, password);
  },
  refreshAccessToken: async function (
    access_token: string
  ): Promise<IAuthResponse> {
    try {
      const rawResponse = await axios.post(
        `${baseURL}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const response: IAuthResponse = {
        access_token: rawResponse.data.access_token,
        refresh_token: rawResponse.data.refresh_token,
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IAuthResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.text = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.text = err.response.data.detail;
        } else {
          errorResponse.text = "Signup failed";
        }
      }
      return errorResponse;
    }
  },
};

export default UserService;
