import { useState } from "react";
import { momentsFood, namesCreateFood } from "../../../const";
import { FormCreateProps, InputsCreateFood } from "../../../types";
import createFood from "../../../services/createFood/createFood";
import { useAppSelector } from "../../../hook/store";
import change from "../../../services/createFood/change";
import { useUserActions } from "../../../hook/useUserActions";



export default function FormCreate({ setAdd, setCreate, mealId, values, setEdit, setSave}: FormCreateProps){
    const [inputs, setInputs] = useState<InputsCreateFood>()
    const { id } = useAppSelector(state => state.user)
    const { updateMealsUser } = useUserActions()

    return(
        <form onSubmit={(e) => createFood({e, inputs, id, updateMealsUser, setAdd, setCreate, mealId, setEdit, setSave})} key={id}>
            <label>
                Fecha: 
                <input 
                    name={namesCreateFood.date}
                    defaultValue={values ? values.date : ''} 
                    onChange={(event) => change(event, setInputs)}
                    type="date">
                </input>
            </label>
            <label>
                Hora: 
                <input 
                    name={namesCreateFood.hour} 
                    defaultValue={values ? values.hour : ''}
                    onChange={(event) => change(event, setInputs)}
                    type="time">
                </input>
            </label>
            <label>
                Moment: 
                <select 
                    name={namesCreateFood.moment} 
                    defaultValue={values ? values.moment : ''}
                    onChange={(event) =>change(event, setInputs)}
                >
                        <option></option>
                        {momentsFood.map(moment => <option value={moment}>{moment}</option>)}
                </select>
            </label>
            <label>
                Comida:
                <input 
                    name={namesCreateFood.food}
                    defaultValue={values ? values.food : ''} 
                    onChange={(event) => change(event, setInputs)}
                    type="text">    
                </input>
            </label>
            <button>
                {!values ? 'Agregar' : 'Guardar'}
            </button>
            <button type='button' onClick={() => {
                if(setAdd) setAdd(prev => !prev)
                else if (setEdit) setEdit(prev => !prev)
            }}>
                Cancelar
            </button>
        </form>
    )
}