import { baseUrl } from "../../const";
import axios, { AxiosResponse } from "axios";
import { Inputs } from "../../types";

export const login = (inputs: Inputs | undefined): Promise<AxiosResponse> => {
  const user = inputs?.user;
  const password = inputs?.password;
  return axios
    .put(`${baseUrl}/user/login`, {
      user,
      password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
