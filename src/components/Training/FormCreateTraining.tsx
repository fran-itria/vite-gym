import { useState } from "react";
import { FormCreateTrainingComponent, InputsCreateTraining } from "../../types";
import cahngeInputs from "../../services/createTraining/changeInputs";
import submitTraining from "../../services/createTraining/submitTraining";
import { useUserActions } from "../../hook/useUserActions";
import { useAppSelector } from "../../hook/store";
import { namesCreateTraining } from "../../const";

export default function FormCreateTraining({setTraining, setCreate, setEdit, trainId, defaultValues, setSave}: FormCreateTrainingComponent){
    const [inputs, setInputs] = useState<InputsCreateTraining>()
    const { updateTrainingsUser } = useUserActions()
    const { id } = useAppSelector(state => state.user)

    return (
        <form onSubmit={(event) => submitTraining({event, inputs, id, updateTrainingsUser, setTraining, setCreate, setEdit, trainId, setSave})}>
            <label>
                Fecha: 
                <input 
                    name={namesCreateTraining.date} 
                    defaultValue={defaultValues ? defaultValues.date?.toString() : ''}
                    type="date" 
                    required 
                    onChange={(event) => cahngeInputs({event, setInputs})}>
                </input>
            </label>
            <label>
                Hora de realizacion:
                <input 
                    name={namesCreateTraining.hour}
                    defaultValue={defaultValues ? defaultValues.hour : ''} 
                    type="time" 
                    required 
                    onChange={(event) => cahngeInputs({event, setInputs}) }>
                </input>
            </label>
            <label>
                Ejercicio: 
                <input 
                    name={namesCreateTraining.exercise}
                    defaultValue={defaultValues ? defaultValues.exercise : ''} 
                    type="text" 
                    required 
                    onChange={(event) => cahngeInputs({event, setInputs}) }>
                </input>
            </label>
            <label>
                Duración:
                <input 
                    name={namesCreateTraining.duration}
                    defaultValue={defaultValues?.duration ? defaultValues.duration : ''} 
                    type="text" 
                    onChange={(event) => cahngeInputs({event, setInputs}) }>
                </input>
            </label>
            <label>
                Distancia: 
                <input 
                    name={namesCreateTraining.distance}
                    defaultValue={defaultValues?.distance ? defaultValues.distance : ''} 
                    type="number" 
                    onChange={(event) => cahngeInputs({event, setInputs}) }>
                </input>
            </label>
            <button>{!setEdit ? 'Agregar' : 'Guardar'}</button>
            <button type='button' onClick={() =>{
                if(setTraining) setTraining(prev => !prev)
                else if(setEdit) setEdit(prev => !prev)
            }}> Cancelar </button>
        </form>
    )
}