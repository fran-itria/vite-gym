import { InputsLogin, InputsRegister } from "../types";
import { NavigateFunction } from "react-router-dom";

export type onChangeLoginProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setInputs: React.Dispatch<React.SetStateAction<InputsLogin | undefined>>;
};

export type submitProps = {
  event: React.FormEvent<HTMLFormElement>;
  inputs: InputsLogin | undefined;
  navigate: NavigateFunction;
};

export type onChangeRegisterProps = {
  event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  setInputs: React.Dispatch<React.SetStateAction<InputsRegister | undefined>>
}
