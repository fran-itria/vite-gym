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

export type addExerciseProps = {
  e: React.FormEvent<HTMLFormElement>
  exercise: number,
  dayId: string | undefined,
  inputs: {
    exerciseName: string,
    series: string,
    reps: string
  },
  routineId: string
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
  routineActual: Function
}

export type onChangeInputsProps = {
  event: React.ChangeEvent<HTMLInputElement>,
  setInputsExecise: React.Dispatch<React.SetStateAction<{
    exercise: number;
    name: string;
    series: string;
    reps: string;
  }>>
}