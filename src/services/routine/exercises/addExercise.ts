/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { addExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import { CaseResolve } from "../../../types";

export default async function addExerciseFunction({
    e,
    dayId,
    exercise,
    inputs,
    routineId,
    setAddExercise,
    routineActual,
    setLoader,
    setRoutineAdmin,
    setWarmUpAdmin,
    caseResolve
}: addExerciseProps) {
    e.preventDefault()
    try {
        setAddExercise(prev => !prev)
        setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.exercise}` })
        const { exerciseName, reps, series, link } = inputs
        await axios.post("/ejercicio/createOneEjercicio", {
            dayId,
            exercise,
            exerciseName,
            reps,
            series,
            link
        })
        if (setRoutineAdmin) {
            const routine = await axios.get(`/rutina/${routineId}`)
            setRoutineAdmin(routine.data)
        }
        if (setWarmUpAdmin) {
            const warmUp = await axios.get(`/calentamiento/${routineId}`)
            setWarmUpAdmin(warmUp.data)
        }
        if (routineId && routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const routine = await axios.get(`/calentamiento/${routineId}`)
                routineActual(routine.data)
            }
        }
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
} 