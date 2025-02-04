/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { addExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import { CaseResolve } from "../../../types";
import sweetAlert from "../../swartAlert";

export default async function addExerciseFunction({
    e,
    dayId,
    exercise,
    inputs,
    routineId,
    routineActual,
    warmUpId,
    warmUpActual,
    setAddExercise,
    setLoader,
    setRoutineAdmin,
}: addExerciseProps) {
    e.preventDefault()
    try {
        setAddExercise(prev => !prev)
        setLoader(`${basicLoaders.create} ${specificLoaders.exercise}`)
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
            if (routineActual) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else if (warmUpActual) {
                const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
                warmUpActual(warmUp.data)
            }
        }
        else if (routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)

        }
        else if (warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
} 