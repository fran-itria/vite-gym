/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModifiedExerciseProps } from "../../../types";
import {
  InputsModified,
  changeInputs,
  modifiedExercise,
} from "../../../services/routine/exercises/modifiedExercise";

export default function ModifiedExercise({
  id,
  name,
  reps,
  series,
  link,
  setOpen,
  routineOrWarmUp,
  setLoader,
  setRoutineAdmin,
  caseResolve,
}: ModifiedExerciseProps) {
  const [inputs, setInputs] = useState<InputsModified>({
    name,
    series,
    reps,
    link,
  });
  return (
    <div className="background flex flex-col p-4 rounded">
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1 text-black dark:text-white">
          Ejercicio:
        </label>
        <input
          name="name"
          defaultValue={name}
          onChange={(e) => changeInputs(e, setInputs)}
          className="text-black dark:text-white"
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1 text-black dark:text-white">
          Series:
        </label>
        <input
          name="series"
          defaultValue={series}
          onChange={(e) => changeInputs(e, setInputs)}
          className="text-black dark:text-white"
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1 text-black dark:text-white">
          Repeticiones:
        </label>
        <input
          name="reps"
          defaultValue={reps}
          onChange={(e) => changeInputs(e, setInputs)}
          className="text-black dark:text-white"
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1 text-black dark:text-white">
          Link de video:
        </label>
        <input
          name="link"
          defaultValue={link}
          onChange={(e) => changeInputs(e, setInputs)}
          className="text-black dark:text-white"
        ></input>
      </div>
      <p className="w-52 font-bold text-black dark:text-white text-wrap text-center">Si desea colocar una biserie
        separe los ejercicios, series y
        repeticiones con una coma ( , )</p>
      <div className="w-full flex justify-between mt-3">
        <button
          className="buttonCancel w-24"
          onClick={() => setOpen(open => !open)}
        >
          Cancelar
        </button>
        <button
          className="buttonConfirm w-24"
          onClick={() =>
            modifiedExercise({
              id,
              inputs,
              routineOrWarmUp,
              setOpen,
              setLoader,
              setRoutineAdmin,
              caseResolve,
            })
          }
        >
          Modificar
        </button>
      </div>
    </div>
  );
}
