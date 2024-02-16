/* eslint-disable @typescript-eslint/no-explicit-any */
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
  idExercise: string | undefined
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
  setIdExercise: React.Dispatch<React.SetStateAction<string | undefined>>
}