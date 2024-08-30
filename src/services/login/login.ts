import axios, { AxiosResponse } from "axios";
import { InputsLogin } from "../../types";

export const login = (inputs?: InputsLogin, token?: string): Promise<AxiosResponse> => {
  const user = inputs?.user;
  const password = inputs?.password;
  const data = token ? { token } : { user, password };
  return axios
    .put('/user/login', data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
