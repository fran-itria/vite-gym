/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import createRoutine from "./craeteRoutine"
import { createRoutineProps } from "../typeServices"
import { Routine } from "../../store/routine/slice"
import { RoutinesUser } from "../../store/user/slice"

export default async function confirmRoutine({ actualiceRoutinesUser, days, routineActual, userId, setOpenCreateRouitine }: createRoutineProps & {
    routineActual: (Days: Routine) => void
    actualiceRoutinesUser: (routine: RoutinesUser) => void
    setOpenCreateRouitine: React.Dispatch<React.SetStateAction<boolean>>
}) {
    try {
        const response = await createRoutine({ days, userId })
        const rutina = await axios.get(`/rutina/${response?.routine.id}`)
        window.alert('Rutina creada exitosamente')
        routineActual(rutina.data)
        actualiceRoutinesUser(response?.user)
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}