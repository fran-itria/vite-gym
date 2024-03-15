/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routine } from "../store/routine/slice";
import { RoutinesUser, WarmUpsUser, extraTraining, meal, payments, shift } from "../store/user/slice";
import { WarmUp } from "../store/warmUp/slice";
import { InputsCreateTraining, InputsLogin, InputsRegister, RoutineOrWarmUp, UsersComponent } from "../types";
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type modifiedExerciseProps = {
  id?: string
  routineOrWarmUp: RoutineOrWarmUp
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  inputs: {
    name?: string | undefined;
    series?: number | undefined;
    reps?: string | undefined;
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
    exerciseName: string;
    series: string;
    reps: string;
    link?: string | undefined;
  }
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
  routineId?: string
  routineActual?: ((Days: Routine) => void) | undefined
  warmUpId?: string
  warmUpActual?: ((Days: WarmUp) => void) | undefined
}

export type onChangeInputsProps = {
  event: React.ChangeEvent<HTMLInputElement>,
  setInputsExecise: React.Dispatch<React.SetStateAction<{
    exercise: number;
    name: string;
    series: string;
    reps: string;
    link?: string | undefined;
  }>>
}

export type createDayRoutineProps = {
  routine: Routine
  routineId: string | undefined,
  dayCreate: { exercise?: number, name?: string, series?: string, reps?: string, link?: string }[],
  routineActual: (Days: Routine) => void
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined
  }[]>>
}

export type createDayWarmUpProps = {
  warmUp: WarmUp
  warmUpId: string
  warmUpActual: ((Days: WarmUp) => void)
  dayCreate: { exercise?: number, name?: string, series?: string, reps?: string, link?: string }[]
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined
  }[]>>
}

export type CreateExerciseInputsProps = {
  e: React.ChangeEvent<HTMLInputElement>,
  setInputs: React.Dispatch<React.SetStateAction<{
    exerciseName: string;
    series: string;
    reps: string;
    link?: string | undefined;
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
    link?: string | undefined
  }[]>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  dayCreate: {
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined
  }[]
  setPagDays: React.Dispatch<React.SetStateAction<number>>
}

export type createRoutineProps = {
  userId: string | null
  days: {
    day: number
    exercises: {
      exercise?: number | undefined;
      name?: string | undefined;
      series?: string | undefined;
      reps?: string | undefined;
      link?: string | undefined
    }[]
  }[]
}

export type deleteRoutineProps = {
  id: string | undefined
  updateRoutinesUser: (routine: RoutinesUser) => void
  userId: string | null
  updateIdGlobal: (id: string | undefined) => void
}

export type deleteWarmUpProps = {
  id: string | undefined
  updateWarmUpUser: (warmUps: WarmUpsUser) => void
  userId: string | null
  updateWarmUpIdGlobal: (id: string | undefined) => void
}

export type confirmRoutineProps = createRoutineProps & {
  updateRoutinesUser?: (routine: RoutinesUser) => void
  setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
  gymName?: string | null
  createWarm?: boolean
  setOpenCreateRouitine: React.Dispatch<React.SetStateAction<boolean>>
  updateWarmUpUser?: (warmUps: WarmUpsUser) => void
  updateWarmUpIdGlobal?: (id: string | undefined) => void
  updateIdGlobal?: (id: string | undefined) => void
  id?: string
}

export type deleteDayProps = {
  id?: string,
  routineId?: string,
  routineActual?: (Days: Routine) => void
  warmUpId?: string
  warmUpActual?: (Days: WarmUp) => void
}

export type deleteExerciseProps = {
  idExercise: string,
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpId?: string
  warmUpActual?: ((Days: WarmUp) => void)
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export type submitChangesProps = {
  e: React.FormEvent<HTMLFormElement>
  inputs?: { admin?: boolean, pay?: boolean, ban?: boolean }
  userId: string
  gymName?: string
  setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
  setCreate: React.Dispatch<React.SetStateAction<boolean>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export type createFoodProps = {
  e: React.FormEvent<HTMLFormElement>
  inputs?: {
    date?: string;
    hour?: string;
    moment?: string;
    food?: string;
  }
  id: string | null
  updateMealsUser: (meals: meal[]) => void
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>
  mealId?: string
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setSave?: React.Dispatch<React.SetStateAction<boolean>>
}

export type changeInputsProps = {
  setInputs: React.Dispatch<React.SetStateAction<InputsCreateTraining | undefined>>
  event: React.ChangeEvent<HTMLInputElement>
}

export type submitTrainingProps = {
  event: React.FormEvent<HTMLFormElement>
  inputs?: InputsCreateTraining
  updateTrainingsUser: (trainings: extraTraining[]) => void
  id: string | null
  setTraining?: React.Dispatch<React.SetStateAction<boolean>>
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>
  trainId?: string
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setSave?: React.Dispatch<React.SetStateAction<boolean>>
}

export type deleteTrainingProps = {
  setRemove: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  updateTrainingsUser: (trainings: extraTraining[]) => void
  userId: string | null
}

export type confirmShift = {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>
  GymId: string | null
  id: string | null
  selectDay: {
    day: string;
    hour: string;
  }
  updateShiftsUser: (shifts: shift[]) => void
}

export type deleteShiftProps = {
  updateShiftsUser: (shifts: shift[]) => void
  userId: string | null
  shiftId: string
  setRemove: React.Dispatch<React.SetStateAction<boolean>>
}

export type subscriptionProps = {
  link: string
  id: string
  e: React.FormEvent<HTMLFormElement>
  setLinkMp: React.Dispatch<React.SetStateAction<string | undefined>>
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>
  amount?: number
}

export type deleteSubscriptionProps = {
  updatePaymentsUser: (payments: payments[]) => void
  userId: string | null
  id: string
  setRemove: React.Dispatch<React.SetStateAction<boolean>>
}

export type createPaymentProps = {
  updatePaymentsUser: (payments: payments[]) => void
  id: string | null
  GymId: string | null
  amount: string | undefined
}

export type updateLoadProps = {
  id: string
  newLoads: string
  routineActual?: ((Days: Routine) => void)
  routineId?: string
  setLoad: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}