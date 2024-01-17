import { InputsLogin, InputsRegister } from "../types";
import { NavigateFunction } from "react-router-dom";

export type submitProps = {
  event: React.FormEvent<HTMLFormElement>;
  inputs: InputsLogin | undefined;
  navigate: NavigateFunction;
};

export type onChangeProps = {
  event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  setInputs: React.Dispatch<React.SetStateAction<InputsLogin | InputsRegister | undefined>>
}
