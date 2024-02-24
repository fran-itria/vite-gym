/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import createRoutine from "./craeteRoutine"
import { confirmRoutineProps } from "../typeServices"

export default async function confirmRoutine({ updateRoutinesUser, days, routineActual, userId, setOpenCreateRouitine, setUsers, gymName }: confirmRoutineProps) {
    try {
        const response = await createRoutine({ days, userId })
        const rutina = await axios.get(`/rutina/${response?.user.Routines[0].id}`)
        window.alert('Rutina creada exitosamente')
        if (routineActual && updateRoutinesUser) {
            routineActual(rutina.data)
            updateRoutinesUser(response?.user)
        }
        if (setUsers && gymName) {
            const users = await axios.get(`/user/forGym/${gymName}`)
            if (users.status == 200) setUsers(users.data)
        }
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}