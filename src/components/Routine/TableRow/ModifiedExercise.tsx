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
        <label className="font-bold italic mb-1 ">
          Ejercicio:
        </label>
        <input
          name="name"
          defaultValue={name}
          onChange={(e) => changeInputs(e, setInputs)}
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1">
          Series:
        </label>
        <input
          name="series"
          defaultValue={series}
          onChange={(e) => changeInputs(e, setInputs)}
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1">
          Repeticiones:
        </label>
        <input
          name="reps"
          defaultValue={reps}
          onChange={(e) => changeInputs(e, setInputs)}
        ></input>
      </div>
      <div className="flex flex-col mb-5">
        <label className="font-bold italic mb-1">
          Link de video:
        </label>
        <input
          name="link"
          defaultValue={link}
          onChange={(e) => changeInputs(e, setInputs)}
        ></input>
      </div>
      <div className="w-full flex justify-between">
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
