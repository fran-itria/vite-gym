/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import createRoutine from "./craeteRoutine"
import { confirmRoutineProps } from "../typeServices"

export default async function confirmRoutine({
    updateRoutinesUser,
    days,
    routineActual,
    userId,
    setOpenCreateRouitine,
    setUsers,
    gymName,
    createWarm
}: confirmRoutineProps) {
    try {
        console.log(createWarm)
        console.log(typeof (createWarm))
        if (createWarm != undefined) {
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
            // USAR ESTADO GLOBAL PARA EL CALENTAMIENTO
            // if (routineActual && updateRoutinesUser) {
            //     const rutina = await axios.get(`/rutina/${response?.user.Routines[0].id}`)
            //     routineActual(rutina.data)
            //     updateRoutinesUser(response?.user)
            // }
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