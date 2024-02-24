/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import createRoutine from "./craeteRoutine"
import { confirmRoutineProps } from "../typeServices"

export default async function confirmRoutine({
    updateRoutinesUser,
    updateWarmUpUser,
    days,
    routineActual,
    warmUpActual,
    userId,
    setOpenCreateRouitine,
    setUsers,
    gymName,
    createWarm
}: confirmRoutineProps) {
    try {
        if (!createWarm) {
            const response = await createRoutine({ days, userId })
            window.alert('Rutina creada exitosamente')
            if (routineActual && updateRoutinesUser) {
                const rutina = await axios.get(`/rutina/${response?.user.Routines[0].id}`)
                routineActual(rutina.data)
                updateRoutinesUser(response?.user)
            }
            if (setUsers && gymName) {
                const users = await axios.get(`/user/forGym/${gymName}`)
                if (users.status == 200) setUsers(users.data)
            }
        } else {
            const response = await axios.post('/calentamiento/createCalentamiento', {
                userId,
                days
            })
            window.alert('Calentamiento creado exitosamente')
            if (warmUpActual && updateWarmUpUser) {
                const rutina = await axios.get(`/calentamiento/${response?.data.id}`)
                const user = await axios.get(`/user/getOneUser/${userId}`)
                warmUpActual(rutina.data)
                updateWarmUpUser(user.data)
            }
            if (response.status == 200 && setUsers && gymName) {
                const users = await axios.get(`/user/forGym/${gymName}`)
                if (users.status == 200) setUsers(users.data)
            }
        }
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}