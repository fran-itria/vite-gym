/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { modifiedExerciseProps, modifiedLoadsProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import { CaseResolve } from "../../../types";

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

export async function modifiedExercise({ id, routineOrWarmUp, setOpen, inputs, setLoader, setRoutineAdmin, caseResolve }: modifiedExerciseProps) {
    try {
        const { routineActual, routineId } = routineOrWarmUp
        setOpen(false)
        setLoader(`${basicLoaders.save} ${specificLoaders.cahnges}`)
        await axios.put('/ejercicio', { ...inputs, id })
        if (setRoutineAdmin && routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const warmUp = await axios.get(`/calentamiento/${routineId}`)
                routineActual(warmUp.data)
            }
        }
        else if (routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const warmUp = await axios.get(`/calentamiento/${routineId}`)
                routineActual(warmUp.data)
            }
        }
        setLoader(undefined)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}

export async function modifiedLoads({ exerciseId, id, load, routineActual, routineId, setOpenLoad, setLoad, setLoader, weekLoad }: modifiedLoadsProps) {
    try {
        setLoader(`${basicLoaders.save} ${specificLoaders.load}`)
        if (id && setLoad) {
            setLoad(false)
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
        window.alert(error.response.data.Error)
    }
}