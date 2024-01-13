import { Inputs } from "../types";
import { NavigateFunction } from "react-router-dom";

export type onChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setInputs: React.Dispatch<React.SetStateAction<Inputs | undefined>>;
};

export type submitProps = {
  event: React.FormEvent<HTMLFormElement>;
  inputs: Inputs | undefined;
  navigate: NavigateFunction;
};
