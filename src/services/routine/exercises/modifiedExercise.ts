/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { modifiedExerciseProps, modifiedLoadsProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import sweetAlert from "../../swartAlert";

export type InputsModified = {
    name?: string
    series?: number
    reps?: string
    link?: string
}

export const changeInputs = (e: React.ChangeEvent<HTMLInputElement>, setInputs: React.Dispatch<React.SetStateAction<InputsModified>>) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(prev => { return { ...prev, [name]: value } })
}

export async function modifiedExercise({ exerciseId, inputs, routineActual, routineId, setLoader, setOpen, setRoutineAdmin }: modifiedExerciseProps) {
    try {
        setOpen(false)
        setLoader(`${basicLoaders.save} ${specificLoaders.cahnges}`)
        await axios.put('/ejercicio', { ...inputs, id: exerciseId })
        if (setRoutineAdmin) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        }
        else if (routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        }
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.response.data.Error)
    }
}

export async function modifiedLoads({ e, exerciseId, id, load, routineActual, routineId, setOpenLoad, setLoad, setLoader, weekLoad }: modifiedLoadsProps) {
    try {
        e.preventDefault()
        setLoader(`${basicLoaders.save} ${specificLoaders.load}`)
        if (id && setLoad) {
            setLoad(undefined)
            await axios.put('/cargas', {
                id,
                newLoads: load
            })
        }
        else if (setOpenLoad) {
            setOpenLoad(false)
            await axios.post('/cargas', {
                exerciseId,
                weight: load,
                week: weekLoad
            })
        }
        if (routineActual)
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    routineActual(response.data)
                })
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.response.data.Error)
    }
}