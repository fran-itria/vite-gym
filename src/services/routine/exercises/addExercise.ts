import axios from "axios";
import { addExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";

export default async function addExerciseFunction({
    e,
    dayId,
    exercise,
    inputs,
    routineId,
    setAddExercise,
    routineActual,
    warmUpId,
    warmUpActual,
    setLoader
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
        if (routineId && routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        } else if (warmUpId && warmUpActual) {
            const routine = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(routine.data)
        }
        setLoader({ state: false })
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
} 