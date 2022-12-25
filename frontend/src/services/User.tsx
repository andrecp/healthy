import axios from "axios";

import type { IServiceResponse, IWeight } from "./Utils";

const baseURL = "http://localhost/v1/users";

const UserService = {
  signUp: async function (
    email: string,
    password: string
  ): Promise<IServiceResponse> {
    try {
      const rawResponse = await axios.post(`${baseURL}/signup`, {
        email,
        password,
      });
      const response: IServiceResponse = {
        data: rawResponse.data,
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IServiceResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.data = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.data = err.response.data.detail;
        } else {
          errorResponse.data = "Signup failed";
        }
      }
      return errorResponse;
    }
  },
  login: async function (
    email: string,
    password: string
  ): Promise<IServiceResponse> {
    try {
      const rawResponse = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      const response: IServiceResponse = {
        data: rawResponse.data,
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IServiceResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.data = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.data = err.response.data.detail;
        } else if (err.response?.status === 404) {
          errorResponse.data = "Invalid email or password";
        } else {
          errorResponse.data = "Login failed";
        }
      }
      return errorResponse;
    }
  },
  addWeight: async function (
    userId: string,
    weight: string,
    date: string
  ): Promise<IServiceResponse> {
    try {
      const rawResponse = await axios.post(`${baseURL}/${userId}/weights`, {
        weight_kg: weight,
        date_time: date,
      });
      const response: IServiceResponse = {
        data: rawResponse.data,
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IServiceResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.data = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.data = err.response.data.detail;
        } else if (err.response?.status === 404) {
          errorResponse.data = "Invalid email or password";
        } else {
          errorResponse.data = "Login failed";
        }
      }
      return errorResponse;
    }
  },
  getWeights: async function (userId: string): Promise<IServiceResponse> {
    try {
      const rawResponse = await axios.get(`${baseURL}/${userId}/weights`);
      const response: IServiceResponse = {
        data: rawResponse.data.weights as IWeight[],
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IServiceResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.data = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.data = err.response.data.detail;
        } else if (err.response?.status === 404) {
          errorResponse.data = "Invalid email or password";
        } else {
          errorResponse.data = "Login failed";
        }
      }
      return errorResponse;
    }
  },
};

export default UserService;
