/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { modifiedExerciseProps, modifiedLoadsProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";

export type InputsModified = {
    name?: string | undefined;
    series?: number | undefined;
    reps?: string | undefined;
}

export const changeInputs = (e: React.ChangeEvent<HTMLInputElement>, setInputs: React.Dispatch<React.SetStateAction<InputsModified>>) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(prev => { return { ...prev, [name]: value } })
}

export async function modifiedExercise({ id, routineOrWarmUp, setOpen, inputs, setLoader }: modifiedExerciseProps) {
    try {
        const { routineActual, routineId, warmUpActual, warmUpId } = routineOrWarmUp
        setOpen(false)
        setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.cahnges}` })
        await axios.put('/ejercicio', { ...inputs, id })
        if (routineActual && routineId) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        }
        if (warmUpActual && warmUpId) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        setLoader({ state: false })
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}

export async function modifiedLoads({ exerciseId, id, load, routineId, routineActual, setOpenLoad, setLoader }: modifiedLoadsProps) {
    try {
        if (id) {
            const response = await axios.put('/cargas', {
                id,
                newLoads: load
            })
            if (response.status == 200) window.alert('Carga modificada correctamente')
        }
        else {
            setOpenLoad(false)
            setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.load}` })
            await axios.post('/cargas', {
                exerciseId,
                weight: load
            })
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    routineActual(response.data)
                })
            setLoader({ state: false })
        }
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}