/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routine } from "../store/routine/slice";
import { RoutinesUser, WarmUpsUser, extraTraining, meal, payments, shift } from "../store/user/slice";
import { WarmUp } from "../store/warmUp/slice";
import { InputsCreateTraining, InputsLogin, InputsRegister, RoutineOrWarmUp, SetLoader, UsersComponent, setRoutineAdmin, setWarmUpAdmin } from "../types";
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
  setLoader: SetLoader
  updateIdGlobal: (id: string | undefined) => void
  updateWarmUpIdGlobal: (id: string | undefined) => void
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
  setLoader: (value: React.SetStateAction<{
    state: boolean;
    reason?: string | undefined;
  }>) => void
  setRoutineAdmin?: setRoutineAdmin
  setWarmUpAdmin?: setWarmUpAdmin
}

export type modifiedLoadsProps = {
  exerciseId?: string | null
  id?: string | null
  load: string
  routineId?: string,
  routineActual?: ((Days: Routine) => void)
  setOpenLoad?: React.Dispatch<React.SetStateAction<boolean>>
  setLoad?: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: (value: React.SetStateAction<{
    state: boolean;
    reason?: string | undefined;
  }>) => void
  weekLoad?: number
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
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  setWarmUpAdmin?: setWarmUpAdmin
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
  routineId: string,
  dayCreate: { exercise?: number, name?: string, series?: string, reps?: string, link?: string }[],
  routineActual?: (Days: Routine) => void
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
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
}

export type createDayWarmUpProps = {
  warmUp: WarmUp
  warmUpId: string | undefined
  warmUpActual?: ((Days: WarmUp) => void)
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
  setLoader: SetLoader
  setWarmUpAdmin?: setWarmUpAdmin
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
  setLoader: SetLoader
}

export type deleteWarmUpProps = {
  id: string | undefined
  updateWarmUpUser: (warmUps: WarmUpsUser) => void
  userId: string | null
  updateWarmUpIdGlobal: (id: string | undefined) => void
  setLoader: SetLoader
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
  setLoader: SetLoader
}

export type deleteDayProps = {
  id?: string,
  routineId?: string,
  routineActual?: (Days: Routine) => void
  warmUpId?: string
  warmUpActual?: (Days: WarmUp) => void
  setRoutineAdmin?: setRoutineAdmin | undefined
  setWarmUpAdmin?: setWarmUpAdmin | undefined
}

export type deleteExerciseProps = {
  idExercise: string
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpId?: string
  warmUpActual?: ((Days: WarmUp) => void)
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  setWarmUpAdmin?: setWarmUpAdmin
}

export type submitChangesProps = {
  e: React.FormEvent<HTMLFormElement>
  inputs?: { admin?: boolean, pay?: boolean, ban?: boolean }
  userId: string
  gymName?: string
  setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
  setLoader: SetLoader
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
  mealId?: string
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: SetLoader
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
  trainId?: string
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: SetLoader
}

export type deleteTrainingProps = {
  setLoader: SetLoader
  id: string
  updateTrainingsUser: (trainings: extraTraining[]) => void
  userId: string | null
}

export type confirmShift = {
  setLoader: SetLoader
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
  setLoader: SetLoader
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
  setLoader: SetLoader
}

export type createPaymentProps = {
  updatePaymentsUser: (payments: payments[]) => void
  id: string | null
  GymId: string | null
  amount: string | undefined
}

export type uploadImageProps = {
  nameFile: string
  file: File
  id: string | null
  updatePhotoUser: (photo: string) => void
  setLoader: React.Dispatch<React.SetStateAction<{
    state: boolean;
    reason?: string | undefined;
  }>>
  setImage: (value: React.SetStateAction<boolean>) => void
  setMenu: (value: React.SetStateAction<boolean>) => void
}