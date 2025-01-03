/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormOneDayComponentProps } from "../../../types";
import onChangeInputs from "../../../services/creteDayRoutine/form/onChangeInputs";

export default function FormOneDay({ actualExercise, setDayCreate, setPag, setOpenCreateRouitine, setAddDay, pag }: FormOneDayComponentProps) {
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

    const back = () => {
        if (pag == 1) {
            setPag(prev => prev - 1)
            setAddDay(prev => !prev)
        } else {
            setPag(prev => {
                return prev - 1
            })
            setDayCreate(day => {
                day.pop()
                return [...day]
            })
        }
    }
    return (
        <div className={`flex flex-col ${!setOpenCreateRouitine && 'background rounded p-4'}`}>
            <b
                className="
                italic 
                underline 
                underline-offset-4 
                decoration-2 
                decoration-red-700
                mb-3
                text-black
                dark:text-gray-300"
            >
                Ejercicio Número {actualExercise}
            </b>
            <div className="flex flex-col">
                <label className="flex items-center font-bold">Nombre del ejercicio:
                    <input
                        className="w-40 ml-2"
                        name="name"
                        onChange={event => onChangeInputs({ event, setInputsExecise })}
                        value={inputsExecise.name}
                        autoFocus
                    >
                    </input>
                </label>
                <label className="flex items-center font-bold">Series:
                    <input
                        className="w-40 ml-2"
                        name="series"
                        onChange={event => onChangeInputs({ event, setInputsExecise })}
                        value={inputsExecise.series}>
                    </input>
                </label>
                <label className="flex items-center font-bold">Repeticiones:
                    <input
                        className="w-40 ml-2"
                        name="reps"
                        onChange={event => onChangeInputs({ event, setInputsExecise })}
                        value={inputsExecise.reps}>
                    </input>
                </label>
                <label className="flex items-center font-bold">* Link de video:
                    <input
                        className="w-40 ml-2"
                        type='url'
                        name="link"
                        onChange={event => onChangeInputs({ event, setInputsExecise })}
                        value={inputsExecise.link}>
                    </input>
                </label>
                <b>( * opcional )</b>
                <div className="flex justify-between mt-4">
                    <button onClick={() => {
                        setPag(0)
                        if (setOpenCreateRouitine) {
                            setOpenCreateRouitine(false)
                        }
                    }}
                        className="buttonCancel w-20">
                        Cancelar
                    </button>
                    <button onClick={() => back()}
                        className="buttonBack w-20">
                        Volver
                    </button>
                    <button
                        onClick={() => next()}
                        className={`${(inputsExecise.name == '' || inputsExecise.series == '' || inputsExecise.reps == '')
                            ? 'opacity-50 pointer-events-none'
                            : 'pointer-events-auto'
                            } buttonConfirm w-20`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}