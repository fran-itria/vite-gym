/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FormOneDayProps } from "../../../types";
import onChangeInputs from "../../../services/creteDayRoutine/form/onChangeInputs";

export default function FormOneDay({ actualExercise, setDayCreate, setPag }: FormOneDayProps) {
    const [inputsExecise, setInputsExecise] = useState<{
        exercise: number,
        name: string,
        series: string,
        reps: string
    }>({
        exercise: actualExercise,
        name: '',
        series: '',
        reps: ''
    })

    const next = () => {
        if (inputsExecise !== null) {
            setDayCreate(day => [...day, inputsExecise])
        }
        setInputsExecise({
            exercise: actualExercise + 1,
            name: "",
            series: "",
            reps: ""
        })
        setPag(prev => prev + 1)
    }

    useEffect(() => console.log(actualExercise), [actualExercise])
    return (
        <div>
            Ejercicio Número {actualExercise}
            <label>Nombre del ejercicio:
                <input name="name" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.name}></input>
            </label>
            <label>Series:
                <input name="series" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.series}></input>
            </label>
            <label>Repeticiones:
                <input name="reps" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.reps}></input>
            </label>
            <button onClick={() => next()}> Siguiente </button>
        </div>
    )
}