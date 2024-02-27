/* eslint-disable @typescript-eslint/no-explicit-any */

import { Routine } from "./store/routine/slice";
import { RoutinesUser, WarmUpsUser } from "./store/user/slice";
import { WarmUp } from "./store/warmUp/slice";

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
  DayId?: string;
  Loads?: [] | {
    id?: string;
    loads?: string;
  }[]
}

export type TableComponentProps = {
  weeks?: number | null
  day: {
    id?: string;
    WarmUp?: string | null;
    Exercises: [] | Exercise[]
  }
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpActual?: ((Days: WarmUp) => void)
  warmUpId?: string
}

export type TableRowComponentProps = Exercise & {
  weeks?: number | null
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpActual?: ((Days: WarmUp) => void)
  warmUpId?: string

}

export type ModalAddLoadComponentProps = {
  id: string | undefined
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
}


export type FormOneDayComponentProps = {
  actualExercise: number,
  setPag: React.Dispatch<React.SetStateAction<number>>
  setDayCreate: React.Dispatch<React.SetStateAction<{
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
  }[]>>
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
  }[]>>
  dayCreate: {
    exercise?: number | undefined;
    name?: string | undefined;
    series?: string | undefined;
    reps?: string | undefined;
  }[]
  pagDays?: number
  setRoutine?: React.Dispatch<React.SetStateAction<[] | {
    day: number;
    exercises: {
      exercise?: number;
      name?: string;
      series?: string;
      reps?: string;
    }[];
  }[]>>
  setPagDays?: React.Dispatch<React.SetStateAction<number>>
  routineId?: string
  routineActual?: (Days: Routine) => void
  routine?: Routine
  warmUpId?: string
  warmUpActual?: (Days: WarmUp) => void
  warmUp?: WarmUp
}

export type CreateExerciseComponentProps = {
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
  day: {
    id: string | undefined;
    WarmUp?: string | null | undefined;
    Exercises: [] | Exercise[]
  }
  warmUpId?: string
  warmUpActual?: (Days: WarmUp) => void
  routineId?: string
  routineActual?: (Days: Routine) => void
}

export type TableCellComponentProps = Exercise & {
  weeks?: number | null
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type RoutineOrWarmUp = {
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpId?: string
  warmUpActual?: (Days: WarmUp) => void
  weeks?: number
}
export type DetailComponenProps = {
  day: {
    id: string;
    WarmUp?: string | undefined;
    Exercises: [] | {
      id?: string | undefined;
      exercise?: number | undefined;
      name?: string | undefined;
      series?: number | undefined;
      reps?: string | undefined;
      DayId?: string | undefined;
      Loads?: [] | {
        id?: string;
        loads?: string;
      }[];
    }[];
  }
  i: number
  routineOrWarmUp: RoutineOrWarmUp
}

export type FormTotalExerciseComponentProps = {
  setPag: React.Dispatch<React.SetStateAction<number>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  pagDays?: number
  routine?: Routine | WarmUp
}

export type ModifiedExerciseProps = {
  series?: number
  name?: string
  reps?: string
  id?: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
  updateWarmUpIdGlobal?: (id: string | undefined) => void
  updateIdGlobal?: (id: string | undefined) => void
  id?: string
}

export type ConfirmDeleteComponentProps = {
  name: string | undefined,
  id: string | undefined,
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  routineId?: string
  routineActual?: (Days: Routine) => void
  warmUpActual?: ((Days: WarmUp) => void)
  warmUpId?: string
}

export type InputsCreateFood = {
  date?: string
  hour?: string
  moment?: string
  food?: string
}

export type MealProps = {id: string, date: string, hour: string, moment: string, food: string}
export type DetailsComponentProps = {
  meal: MealProps
  setDeleteMeal: React.Dispatch<React.SetStateAction<boolean>>
}