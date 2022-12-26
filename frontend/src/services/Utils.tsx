export interface IAuthResponse {
  text?: string;
  error: boolean;
  access_token?: string;
  refresh_token?: string;
}

export interface IWeight {
  weight_kg: number;
  date_time: number;
}

export interface IWeightResponse {
  text?: string;
  error: boolean;
}

export interface IWeightsResponse {
  text?: string;
  weights?: IWeight[];
  error: boolean;
}
