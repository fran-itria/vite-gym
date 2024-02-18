/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import createRoutine from "./craeteRoutine"
import { confirmRoutineProps } from "../typeServices"

export default async function confirmRoutine({ updateRoutinesUser, days, routineActual, userId, setOpenCreateRouitine }: confirmRoutineProps) {
    try {
        const response = await createRoutine({ days, userId })
        const rutina = await axios.get(`/rutina/${response?.routine.id}`)
        window.alert('Rutina creada exitosamente')
        routineActual(rutina.data)
        updateRoutinesUser(response?.user)
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}