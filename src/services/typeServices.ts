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

export type modifiedExerciseProps = {
  id: string
  inputs?: {
    name: string,
    series: number,
    reps: number,
    loads: string[]
  }
}

export type modifiedLoadsProps = {
  exerciseId?: string | null
  id?: string | null
  load: string
  routineId: string,
  routineActual: Function
}