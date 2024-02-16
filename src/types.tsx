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

export type TableComponentProps = {
  weeks: number | null
  day: {
    id: string | undefined;
    WarmUp?: string | null | undefined;
    Exercises: [] | {
      id: string | null;
      exercise: number | null;
      name: string | null;
      series: number | null;
      reps: string | null;
      DayId: string | null;
      Loads: [] | {
        id: string | null,
        loads: string | null
      }[];
    }[]
  }
}

export type TableRowComponentProps = {
  exercise: {
    id: string,
    name: string,
    series: string,
    reps: string,
    Loads: {
      id: string,
      loads: string
    }[]
  }
  weeks: number | null
}

export type ModalAddLoadComponentProps = {
  idExercise: string | null
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
    Exercises: [] | {
      id: string | null;
      exercise: number | null;
      name: string | null;
      series: number | null;
      reps: string | null;
      DayId: string | null;
      Loads: {
        id: string | null,
        loads: string | null
      }[]
    }[];
  }
}