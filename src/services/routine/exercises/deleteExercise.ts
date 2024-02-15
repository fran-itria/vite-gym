/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

export default async function deleteExercise(idExercise: string | null, routineId: string, routineActual: Function, setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        console.log(idExercise)
        const response = await axios.delete(`/ejercicio/delete/${idExercise}`)
        const routine = await axios.get(`/rutina/${routineId}`)
        if (response.status == 200) window.alert(response.data.Message)
        setConfirmDelete(confirmDelete => !confirmDelete)
        routineActual(routine.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}