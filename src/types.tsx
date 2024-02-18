/* eslint-disable @typescript-eslint/no-explicit-any */

import { Routine } from "./store/routine/slice";

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
  Loads: [] | {
    id?: string;
    loads?: string;
  }[]
}

export type TableComponentProps = {
  weeks: number | null
  day: {
    id: string | undefined;
    WarmUp?: string | null | undefined;
    Exercises: [] | Exercise[]
  }
}

export type TableRowComponentProps = Exercise & {
  weeks: number | null
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
}

export type CreateExerciseComponentProps = {
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
  day: {
    id: string | undefined;
    WarmUp?: string | null | undefined;
    Exercises: [] | Exercise[]
  }
}

export type TableCellComponentProps = Exercise & {
  weeks: number | null
  setOpenLoad: React.Dispatch<React.SetStateAction<boolean>>
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
      Loads: [] | {
        id?: string;
        loads?: string;
      }[];
    }[];
  }
  i: number
}

export type FormTotalExerciseComponentProps = {
  setPag: React.Dispatch<React.SetStateAction<number>>
  setTotalExercise: React.Dispatch<React.SetStateAction<string>>
  setAddDay: React.Dispatch<React.SetStateAction<boolean>>
  pagDays?: number
  routine?: Routine
}

export type ModifiedExerciseProps = {
  series?: number
  name?: string
  reps?: string
  id?: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}