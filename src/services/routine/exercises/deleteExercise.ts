/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import { deleteExerciseProps } from "../../typeServices";

export default async function deleteExercise({
    idExercise,
    setConfirmDelete,
    routineActual,
    routineId,
    warmUpActual,
    warmUpId
}: deleteExerciseProps) {
    try {
        const response = await axios.delete(`/ejercicio/delete/${idExercise}`)
        if (routineId && routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            if (response.status == 200) window.alert(response.data.Message)
            setConfirmDelete(confirmDelete => !confirmDelete)
            routineActual(routine.data)
        } else if (warmUpId && warmUpActual) {
            const routine = await axios.get(`/calentamiento/${warmUpId}`)
            if (response.status == 200) window.alert(response.data.Message)
            setConfirmDelete(confirmDelete => !confirmDelete)
            warmUpActual(routine.data)
        }
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}