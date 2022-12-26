import axios from "axios";

import { domain, IWeightResponse, IWeightsResponse } from "./Utils";

const baseURL = domain + "/api/v1/weights/";

const WeightService = {
  addWeight: async function (
    weight: string,
    date: string
  ): Promise<IWeightResponse> {
    try {
      await axios.post(`${baseURL}`, {
        weight_kg: weight,
        date_time: date,
      });
      const response: IWeightResponse = {
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IWeightResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.text = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.text = err.response.data.detail;
        } else if (err.response?.status === 404) {
          errorResponse.text = "Invalid email or password";
        } else {
          errorResponse.text = "Login failed";
        }
      }
      return errorResponse;
    }
  },
  getWeights: async function (): Promise<IWeightsResponse> {
    try {
      const rawResponse = await axios.get(`${baseURL}`);
      const response: IWeightsResponse = {
        weights: rawResponse.data.weights,
        error: false,
      };
      return response;
    } catch (err) {
      let errorResponse = { error: true } as IWeightResponse;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          errorResponse.text = "No Server Response";
        } else if (err.response?.status === 400) {
          errorResponse.text = err.response.data.detail;
        } else if (err.response?.status === 404) {
          errorResponse.text = "Invalid email or password";
        } else {
          errorResponse.text = "Login failed";
        }
      }
      return errorResponse;
    }
  },
};

export default WeightService;
