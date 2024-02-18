/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ModifiedExerciseProps } from "../../../types";
import axios from "axios";
import { useRoutineActions } from "../../../hook/useRoutineActions";
import useInformation from "../../../hook/Components/Routine/useInformation";

export default function ModifiedExercise({ id, name, reps, series, setOpen }: ModifiedExerciseProps) {
    const [inputs, setInputs] = useState<{ name?: string, series?: number, reps?: string }>({ name, series, reps })
    const { routineActual } = useRoutineActions()
    const { routineId } = useInformation()
    const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(prev => { return { ...prev, [name]: value } })
    }
    const onSubmit = async () => {
        try {
            const response = await axios.put('/ejercicio', { id, name: inputs.name, series: inputs.series, reps: inputs.reps })
            console.log(response.data)
            const routine = await axios.get(`/rutina/${routineId}`)
            console.log(routine)
            if (routine.status == 200) {
                setOpen(open => !open)
                routineActual(routine.data)
            }
        } catch (error: any) {
            console.log(error)
            window.alert(error.response.data.Error)
        }
    }
    useEffect(() => console.log(inputs), [inputs])
    return (
        <div style={{ border: 'solid, black, 2px', position: 'absolute', top: '50%', right: '50%', background: 'white' }}>
            <label>
                Name:
                <input name='name' defaultValue={name} onChange={(e) => changeInputs(e)}></input>
            </label>
            <label>
                Series:
                <input name='series' defaultValue={series} onChange={(e) => changeInputs(e)}></input>
            </label>
            <label>
                Repeticiones:
                <input name='reps' defaultValue={reps} onChange={(e) => changeInputs(e)}></input>
            </label>
            <button onClick={() => onSubmit()}> Modificar </button>
        </div>
    )
}