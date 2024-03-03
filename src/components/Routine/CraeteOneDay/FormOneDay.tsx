/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormOneDayComponentProps } from "../../../types";
import onChangeInputs from "../../../services/creteDayRoutine/form/onChangeInputs";

export default function FormOneDay({ actualExercise, setDayCreate, setPag }: FormOneDayComponentProps) {
    const [inputsExecise, setInputsExecise] = useState<{
        exercise: number,
        name: string,
        series: string,
        reps: string
        link?: string
    }>({
        exercise: actualExercise,
        name: '',
        series: '',
        reps: '',
        link: ''
    })

    const next = () => {
        if (inputsExecise !== null) {
            setDayCreate(day => [...day, inputsExecise])
        }
        setInputsExecise({
            exercise: actualExercise + 1,
            name: "",
            series: "",
            reps: "",
            link: ""
        })
        setPag(prev => prev + 1)
    }

    return (
        <div>
            Ejercicio Número {actualExercise}
            <label>
                Nombre del ejercicio:
                <input name="name" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.name}></input>
            </label>
            <label>
                Series:
                <input name="series" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.series}></input>
            </label>
            <label>
                Repeticiones:
                <input name="reps" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.reps}></input>
            </label>
            <label>
                Link de video del ejercicio:
                <input type='url' name="link" onChange={event => onChangeInputs({ event, setInputsExecise })} value={inputsExecise.link}></input>
            </label>
            <button onClick={() => next()}> Siguiente </button>
        </div>
    )
}