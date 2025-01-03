import { useState } from "react";
import { momentsFood, namesCreateFood } from "../../../const";
import { FormCreateProps, InputsCreateFood } from "../../../types";
import createFood from "../../../services/createFood/createFood";
import { useAppSelector } from "../../../hook/store";
import change from "../../../services/createFood/change";
import { useUserActions } from "../../../hook/useUserActions";



export default function FormCreate({ setAdd, mealId, values, setEdit, setLoader }: FormCreateProps) {
    const [inputs, setInputs] = useState<InputsCreateFood>()
    const { id } = useAppSelector(state => state.user)
    const { updateMealsUser } = useUserActions()

    return (
        <form
            className="background h-2/6 flex flex-col justify-around items-center p-4 rounded"
            onSubmit={(e) => createFood({
                e,
                inputs,
                id,
                updateMealsUser,
                setAdd,
                mealId,
                setEdit,
                setLoader
            })}
            key={id}
        >
            <div className="w-52 flex flex-row justify-around">
                <label className="font-bold">
                    Fecha:
                </label>
                <input
                    autoFocus
                    name={namesCreateFood.date}
                    defaultValue={values ? values.date : ''}
                    onChange={(event) => change(event, setInputs)}
                    type="date">
                </input>
            </div>
            <div className="w-48 flex flex-row justify-start">
                <label className="font-bold mr-3">
                    Hora:
                </label>
                <input
                    name={namesCreateFood.hour}
                    defaultValue={values ? values.hour : ''}
                    onChange={(event) => change(event, setInputs)}
                    type="time">
                </input>
            </div>
            <div className="w-64 flex flex-row justify-start mr-3">
                <label className="font-bold mr-3">
                    Momento:
                </label>
                <select
                    className="rounded-full"
                    name={namesCreateFood.moment}
                    defaultValue={values ? values.moment : ''}
                    onChange={(event) => change(event, setInputs)}
                >
                    <option></option>
                    {momentsFood.map(moment => <option value={moment}>{moment}</option>)}
                </select>
            </div>
            <div className="w-54 flex flex-row mr-4">
                <label className="font-bold mr-3">
                    Comida:
                </label>
                <input
                    className="w-36 rounded"
                    name={namesCreateFood.food}
                    defaultValue={values ? values.food : ''}
                    onChange={(event) => change(event, setInputs)}
                    type="text">
                </input>
            </div>
            <div className="w-full flex justify-around">
                <button
                    className="buttonCancel w-24"
                    type='button'
                    onClick={() => {
                        if (setAdd) setAdd(prev => !prev)
                        else if (setEdit) setEdit(prev => !prev)
                    }}
                >
                    Cancelar
                </button>
                <button className="buttonConfirm w-24">
                    {!values ? 'Agregar' : 'Guardar'}
                </button>
            </div>
        </form>
    )
}