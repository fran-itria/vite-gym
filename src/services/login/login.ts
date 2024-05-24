import axios, { AxiosResponse } from "axios";
import { InputsLogin } from "../../types";

export const login = (inputs: InputsLogin | undefined): Promise<AxiosResponse> => {
  const user = inputs?.user;
  const password = inputs?.password;
  return axios
    .put('/user/login', {
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
