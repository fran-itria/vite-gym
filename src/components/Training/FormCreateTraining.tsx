import { useState } from "react";
import { FormCreateTrainingComponent, InputsCreateTraining } from "../../types";
import cahngeInputs from "../../services/createTraining/changeInputs";
import submitTraining from "../../services/createTraining/submitTraining";
import { useUserActions } from "../../hook/useUserActions";
import { useAppSelector } from "../../hook/store";
import { namesCreateTraining } from "../../const";

export default function FormCreateTraining({ setTraining, setLoader, setEdit, trainId, defaultValues }: FormCreateTrainingComponent) {
    const [inputs, setInputs] = useState<InputsCreateTraining>()
    const { updateTrainingsUser } = useUserActions()
    const { id } = useAppSelector(state => state.user)

    return (
        <form
            className="background h-2/6 flex flex-col justify-around items-center p-4 rounded"
            onSubmit={(event) => submitTraining({
                event,
                inputs,
                id,
                updateTrainingsUser,
                setTraining,
                setEdit,
                trainId,
                setLoader
            })}
        >
            <div className="w-48 flex flex-row">
                <label className="font-bold mr-3">
                    Fecha:
                </label>
                <input
                    autoFocus
                    name={namesCreateTraining.date}
                    defaultValue={defaultValues ? defaultValues.date?.toString() : ''}
                    type="date"
                    required
                    onChange={(event) => cahngeInputs({ event, setInputs })}>
                </input>
            </div>
            <div className="w-44 flex flex-row justify-start">
                <label className="font-bold mr-3">
                    Hora:
                </label>
                <input
                    name={namesCreateTraining.hour}
                    defaultValue={defaultValues ? defaultValues.hour : ''}
                    type="time"
                    required
                    onChange={(event) => cahngeInputs({ event, setInputs })}>
                </input>
            </div>
            <div className="w-56 flex flex-row justify-start">
                <label className="font-bold mr-3">
                    Ejercicio:
                </label>
                <input
                    className="w-36 rounded"
                    name={namesCreateTraining.exercise}
                    defaultValue={defaultValues ? defaultValues.exercise : ''}
                    type="text"
                    required
                    onChange={(event) => cahngeInputs({ event, setInputs })}>
                </input>
            </div>
            <div className="w-64 flex flex-row justify-start">
                <label className="font-bold mr-3">
                    * Duración:
                </label>
                <input
                    className="w-36 rounded"
                    name={namesCreateTraining.duration}
                    defaultValue={defaultValues?.duration ? defaultValues.duration : ''}
                    type="text"
                    onChange={(event) => cahngeInputs({ event, setInputs })}>
                </input>
            </div>
            <div className="w-64 flex flex-row justify-start">
                <label className="font-bold mr-3">
                    * Distancia:
                </label>
                <input
                    className="w-36 rounded"
                    name={namesCreateTraining.distance}
                    defaultValue={defaultValues?.distance ? defaultValues.distance : ''}
                    type="number"
                    onChange={(event) => cahngeInputs({ event, setInputs })}>
                </input>
            </div>
            <div className="w-full flex flex-row justify-start">
                <b>( * opcional )</b>
            </div>
            <div className="w-full flex justify-around">
                <button
                    className="buttonCancel w-24"
                    type='button'
                    onClick={() => {
                        if (setTraining) setTraining(prev => !prev)
                        else if (setEdit) setEdit(prev => !prev)
                    }}
                >
                    Cancelar
                </button>
                <button className="buttonConfirm w-24">
                    {!setEdit ? 'Agregar' : 'Guardar'}
                </button>
            </div>
        </form>
    )
}