/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModifiedExerciseProps } from "../../../types";
import { InputsModified, changeInputs, modifiedExercise } from "../../../services/routine/exercises/modifiedExercise";

export default function ModifiedExercise({ id, name, reps, series, link, setOpen, routineOrWarmUp, setLoader, setRoutineAdmin, caseResolve }: ModifiedExerciseProps) {

    const [inputs, setInputs] = useState<InputsModified>({ name, series, reps, link })
    return (
        <div style={{ border: 'solid, black, 2px', position: 'absolute', top: '50%', right: '50%', background: 'white' }}>
            <label>
                Name:
                <input name='name' defaultValue={name} onChange={(e) => changeInputs(e, setInputs)}></input>
            </label>
            <label>
                Series:
                <input name='series' defaultValue={series} onChange={(e) => changeInputs(e, setInputs)}></input>
            </label>
            <label>
                Repeticiones:
                <input name='reps' defaultValue={reps} onChange={(e) => changeInputs(e, setInputs)}></input>
            </label>
            <label>
                Link de video:
                <input name='link' defaultValue={link} onChange={(e) => changeInputs(e, setInputs)}></input>
            </label>
            <button onClick={() => modifiedExercise({ id, inputs, routineOrWarmUp, setOpen, setLoader, setRoutineAdmin, caseResolve })}> Modificar </button>
        </div>
    )
}