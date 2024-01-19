/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputsLogin, InputsRegister } from "../types";
import { Location, NavigateFunction } from "react-router-dom";

export type onChangeProps = {
  event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  setInputs: React.Dispatch<React.SetStateAction<InputsLogin | InputsRegister | undefined>>
}

export type Inputs = InputsLogin | InputsRegister | undefined

export type registerProps = {
  inputs: Inputs,
  url: Location<any>
}

export type onSubmitProps = {
  event: React.FormEvent<HTMLFormElement>;
  inputs: Inputs;
  navigate: NavigateFunction;
  addUser: Function,
  url?: Location<any>,
}