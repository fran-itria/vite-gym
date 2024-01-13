import { baseUrl } from "../const";
import axios from "axios";
import { Inputs } from "../types";

export const login = (inputs: Inputs | undefined) => {
  const user = inputs?.user;
  const password = inputs?.password;
  const logged = axios
    .put(`${baseUrl}/user/login`, {
      user,
      password,
    })
    .then((response) => {
      return response.data.json();
    })
    .catch((error) => console.log(error));
  console.log(logged);
};
