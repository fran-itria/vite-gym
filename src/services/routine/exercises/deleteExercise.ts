/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

export default async function deleteExercise(idExercise: string | undefined, routineId: string | undefined, routineActual: Function, setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
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