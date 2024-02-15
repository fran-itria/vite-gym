import axios from "axios";
import { addExerciseProps } from "../../typeServices";

export default async function addExerciseFunction({ e, dayId, exercise, inputs, routineId, setAddExercise, routineActual }: addExerciseProps) {
    e.preventDefault()
    try {
        const { exerciseName, reps, series } = inputs
        const response = await axios.post("/ejercicio/createOneEjercicio", {
            dayId,
            exercise,
            exerciseName,
            reps,
            series
        })
        const routine = await axios.get(`/rutina/${routineId}`)
        if (response.status == 200) window.alert('Ejercicio creado exitosamente')
        setAddExercise(prev => !prev)
        routineActual(routine.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
} 