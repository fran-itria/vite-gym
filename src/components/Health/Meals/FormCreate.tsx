import { useState } from "react";
import { momentsFood, namesCreateFood } from "../../../const";
import { InputsCreateFood } from "../../../types";
import createFood from "../../../services/createFood/createFood";
import { useAppSelector } from "../../../hook/store";
import change from "../../../services/createFood/change";
import { useUserActions } from "../../../hook/useUserActions";



export default function FormCreate({ setAdd, setCreate}: {setAdd: React.Dispatch<React.SetStateAction<boolean>>, setCreate: React.Dispatch<React.SetStateAction<boolean>>}){
    const [inputs, setInputs] = useState<InputsCreateFood>()
    const { id } = useAppSelector(state => state.user)
    const { updateMealsUser } = useUserActions()

    return(
        <form onSubmit={(e) => createFood({e, inputs, id, updateMealsUser, setAdd, setCreate})} key={id}>
            <label>
                Fecha: 
                <input name={namesCreateFood.date} onChange={(event) => change(event, setInputs)}type="date"></input>
            </label>
            <label>
                Hora: 
                <input name={namesCreateFood.hour} onChange={(event) => change(event, setInputs)}type="time"></input>
            </label>
            <label>
                Moment: 
                <select name={namesCreateFood.moment} onChange={(event) =>change(event, setInputs)}>
                    <option></option>
                    {momentsFood.map(moment => <option value={moment}>{moment}</option>)}
                </select>
            </label>
            <label>
                Comida:
                <input name={namesCreateFood.food} onChange={(event) => change(event, setInputs)}type="text"></input>
            </label>
            <button>Agregar</button>
        </form>
    )
}