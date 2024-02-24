/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routine } from "../store/routine/slice";
import { RoutinesUser } from "../store/user/slice";
// import { RoutinesUser } from "../store/user/slice";
import { InputsLogin, InputsRegister, UsersComponent } from "../types";
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
  setPending: React.Dispatch<React.SetStateAction<boolean>>
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
  routineId?: string,
  routineActual: Function
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
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
  routineId: string | undefined
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

export type createDayProps = {
  routine: Routine
  routineId: string | undefined,
  dayCreate: { exercise?: number, name?: string, series?: string, reps?: string }[],
  routineActual: (Days: Routine) => void
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
  }[]>>
}

export type CreateExerciseInputsProps = {
  e: React.ChangeEvent<HTMLInputElement>,
  setInputs: React.Dispatch<React.SetStateAction<{
    exerciseName: string;
    series: string;
    reps: string;
  }>>
}

export type addDayRoutineProps = {
  pagDays: number
  setRoutine: React.Dispatch<React.SetStateAction<[] | {
    day: number;
    exercises: {
      exercise?: number | undefined;
      name?: string | undefined;
      series?: string | undefined;
      reps?: string | undefined;
    }[];
  }[]>>
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
  }[]>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  dayCreate: {
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
  }[]
  setPagDays: React.Dispatch<React.SetStateAction<number>>
}

export type createRoutineProps = {
  // routineActual: (Days: Routine) => void
  userId: string | null
  days: {
    day: number
    exercises: {
      exercise?: number | undefined;
      name?: string | undefined;
      series?: string | undefined;
      reps?: string | undefined;
    }[]
  }[]
  // actualiceRoutinesUser: (routine: RoutinesUser) => void
}

export type deleteRoutineProps = {
  id: string | undefined,
  routineActual: (Days: Routine) => void
  updateRoutinesUser: (routine: RoutinesUser) => void
  userId: string | null
}

export type confirmRoutineProps = createRoutineProps & {
  routineActual?: (Days: Routine) => void
  updateRoutinesUser?: (routine: RoutinesUser) => void
  setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
  gymName?: string | null
  setOpenCreateRouitine: React.Dispatch<React.SetStateAction<boolean>>
}