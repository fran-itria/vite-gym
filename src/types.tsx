/* eslint-disable @typescript-eslint/no-explicit-any */

import { Routine } from "./store/routine/slice";
import { RoutinesUser, WarmUpsUser, meal, payments } from "./store/user/slice";

/* eslint-disable @typescript-eslint/ban-types */
export enum InformationEnum {
  meal,
  exercises,
}

export type PropsNavHealth = {
  information: InformationEnum;
  setInformation: React.Dispatch<React.SetStateAction<InformationEnum>>;
};

export type InputsLogin = {
  user?: string;
  password?: string;
};

export type InputsRegister = {
  gymName?: string,
  name?: string,
  surname?: string,
  contacEmergency?: number,
  dni?: number,
  age?: number,
  email?: string,
  phone?: number,
  user?: string;
  password?: string;
  confirmPassword?: string;
};

export type Elements = {
  labelName: string
  type: string,
  name: string,
  setInputs: React.Dispatch<React.SetStateAction<InputsLogin | InputsRegister | undefined>>
}

export type Exercise = {
  id?: string;
  exercise?: number;
  name?: string;
  series?: number;
  reps?: string;
  link?: string;
  DayId?: string;
  Loads?: [] | {
    id?: string;
    loads?: string;
  }[]
}

export type SetLoader = (value: React.SetStateAction<string | undefined>) => void

export type setRoutineAdmin = React.Dispatch<React.SetStateAction<Routine | undefined>>

export type TableComponentProps = {
  day: {
    id?: string;
    WarmUp?: string | null;
    Exercises: [] | Exercise[]
  }
  routineOrWarmUp: RoutineOrWarmUp
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export type TableRowComponentProps = Exercise & {
  routineOrWarmUp: RoutineOrWarmUp
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export type ModalAddLoadComponentProps = {
  id: string | undefined
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: SetLoader
  weekLoad: number
  routineOrWarmUp: RoutineOrWarmUp
}


export type FormOneDayComponentProps = {
  actualExercise: number,
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined;
  }[]>>
  setOpenCreateRouitine?: React.Dispatch<React.SetStateAction<boolean>>
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  pag: number
}

export type TableConfirmDayComponentProps = {
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined;
  }[]>>
  dayCreate: {
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
    link?: string | undefined;
  }[]
  pagDays?: number
  setRoutine?: React.Dispatch<React.SetStateAction<[] | {
    day: number;
    exercises: {
      exercise?: number;
      name?: string;
      series?: string;
      reps?: string;
      link?: string
    }[];
  }[]>>
  setPagDays?: React.Dispatch<React.SetStateAction<number>>
  routineId?: string
  routineActual?: (Days: Routine) => void
  routine?: Routine
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  setOpenCreateRouitine?: React.Dispatch<React.SetStateAction<boolean>>
}

export type CreateExerciseComponentProps = {
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
  day: {
    id: string | undefined;
    WarmUp?: string | null | undefined;
    Exercises: [] | Exercise[]
  }
  routineId?: string
  routineActual?: (Days: Routine) => void
  setLoader: SetLoader;
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export type TableCellComponentProps = Exercise & {
  weeks?: number | null
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setLoad: React.Dispatch<React.SetStateAction<boolean>>
  setIdLoad: React.Dispatch<React.SetStateAction<string>>
  setWeekLoad: React.Dispatch<React.SetStateAction<number>>
  setRoutineAdmin?: setRoutineAdmin
}

export type RoutineOrWarmUp = {
  routineId?: string
  routineActual?: (Days: Routine) => void
  weeks?: number
}

export type DetailComponenProps = {
  day: {
    id: string;
    WarmUp?: string | undefined;
    Exercises: [] | Exercise[];
  }
  i: number
  routineOrWarmUp: RoutineOrWarmUp
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export enum CaseResolve {
  calentamiento,
  rutina
}

export type FormTotalExerciseComponentProps = {
  setPag: React.Dispatch<React.SetStateAction<number>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  setPagDays?: React.Dispatch<React.SetStateAction<number>>
  setTotalDays?: React.Dispatch<React.SetStateAction<string>>
  setOpenCreateRouitine?: React.Dispatch<React.SetStateAction<boolean>>
  pagDays?: number
  routine?: Routine
}

export type ModifiedExerciseProps = {
  series?: number
  name?: string
  reps?: string
  link?: string
  id?: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  routineOrWarmUp: RoutineOrWarmUp
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export type UsersComponent = [] | {
  id: string,
  name: string,
  surname: string,
  dni: number,
  age: number,
  email: string,
  user: string,
  phone: string,
  contactEmergency: string,
  admin: boolean,
  pay: boolean,
  ban: boolean,
  password: string,
  login: boolean,
  linkMp?: string,
  photo?: string,
  GymId: string,
  Gym: {
    name: string
  },
  Routines: [] | { id: string }[],
  WarmUps: [] | { id: string }[],
  Meals: [] | {
    id: string,
    date: string,
    hour: string,
    moment: string,
    food: string,
    UserId: string
  }[],
  ExtraTrainings: [] | {
    id: string
    date: string
    hour: string
    exercise: string
    duration: string | null
    distance: string | null
    UserId: string
  }[],
  Shifts: [] | {
    id: string
    date: string
    hour: string
    userId: string
  }[]
}[]

export type CreateRoutineComponentProps = {
  updateRoutinesUser?: (routine: RoutinesUser) => void
  updateWarmUpUser?: (warmUps: WarmUpsUser) => void
  setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
  setOpenCreateRouitine: React.Dispatch<React.SetStateAction<boolean>>
  userId: string | null
  gymName?: string | null
  createWarm?: boolean
  updateIdGlobal: (id: string | undefined) => void
  id?: string
  setLoader: SetLoader
}

export type ConfirmDeleteComponentProps = {
  name: string | undefined,
  id: string | undefined,
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  routineId?: string
  routineActual?: (Days: Routine) => void
  setLoader: SetLoader
  setRoutineAdmin?: setRoutineAdmin
  caseResolve: CaseResolve
}

export type InputsCreateFood = {
  date?: string
  hour?: string
  moment?: string
  food?: string
}

export type MealProps = { id: string, date: string, hour: string, moment: string, food: string }

export type DetailsComponentProps = {
  meal: MealProps
  setLoader: SetLoader
  setValues: React.Dispatch<React.SetStateAction<InputsCreateFood | undefined>>
  setMealId: React.Dispatch<React.SetStateAction<string | undefined>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export type Extra = {
  id: string
  date: Date,
  hour: string,
  exercise: string,
  duration: string | null,
  distance: number | null,
}

export type InputsCreateTraining = {
  date?: Date,
  hour?: string,
  exercise?: string,
  duration?: string | null,
  distance?: number | null
}
export type FormCreateTrainingComponent = {
  setTraining?: React.Dispatch<React.SetStateAction<boolean>>
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  trainId?: string
  defaultValues?: InputsCreateTraining
  setLoader: SetLoader
}

export type DetailsExtraProps = {
  extra: Extra
  setLoader: SetLoader
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  setTrainId: React.Dispatch<React.SetStateAction<string | undefined>>
  setDefaultValues: React.Dispatch<React.SetStateAction<InputsCreateTraining | undefined>>
}

export type FormEditProps = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

export type FormCreateProps = {
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>,
  values?: InputsCreateFood
  mealId?: string
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setLoader: SetLoader
}

export type deleteMealProps = {
  mealId: string
  setLoader: SetLoader
  updateMealsUser: (meals: meal[]) => void
  id: string | null
}

export type MonthProps = {
  month: number
  setMonth: React.Dispatch<React.SetStateAction<number>>
  setActualYear: React.Dispatch<React.SetStateAction<number>>
}

export type DaysProps = {
  month: number
  day: number
  setDay: React.Dispatch<React.SetStateAction<number>>
  actualYear: number
  GymId: string | null
  limit: number | null
}

export type TableSubscriptionProps = {
  Payments: [] | payments[]
  updatePaymentsUser: (payments: payments[]) => void
  id: string | null
  setLoader: SetLoader
}