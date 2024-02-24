import axios from "axios";
import { addExerciseProps } from "../../typeServices";

export default async function addExerciseFunction({ e, dayId, exercise, inputs, routineId, setAddExercise, routineActual, warmUpId, warmUpActual }: addExerciseProps) {
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
        if (routineId && routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            if (response.status == 200) window.alert('Ejercicio creado exitosamente')
            setAddExercise(prev => !prev)
            routineActual(routine.data)
        } else if (warmUpId && warmUpActual) {
            const routine = await axios.get(`/calentamiento/${warmUpId}`)
            if (response.status == 200) window.alert('Ejercicio creado exitosamente')
            setAddExercise(prev => !prev)
            warmUpActual(routine.data)
        }
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
} 