/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
// import createRoutine from "./craeteRoutine";
import { confirmRoutineProps } from "../typeServices"

export default async function confirmRoutine({
    updateRoutinesUser,
    updateIdGlobal,
    updateWarmUpUser,
    updateWarmUpIdGlobal,
    setOpenCreateRouitine,
    setUsers,
    days,
    userId,
    gymName,
    createWarm,
    id
}: confirmRoutineProps) {
    try {
        if (!createWarm) {
            await axios.post("/rutina/createRutina", { userId, days })
            window.alert('Rutina creada exitosamente')
            if(updateRoutinesUser && updateIdGlobal) {
                if(!setUsers) {
                    const user = await axios.get(`/user/getOneUser/${userId}`)
                    updateIdGlobal(undefined)
                    updateRoutinesUser(user.data)
                }else {
                    if(id == userId) {
                        const user = await axios.get(`/user/getOneUser/${userId}`)
                        updateIdGlobal(undefined)
                        updateRoutinesUser(user.data)
                    }
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
        } else {
            await axios.post('/calentamiento/createCalentamiento', { userId, days })
            window.alert('Calentamiento creado exitosamente')
            if(updateWarmUpUser && updateWarmUpIdGlobal) {
                if(!setUsers) {
                    const user = await axios.get(`/user/getOneUser/${userId}`)
                    updateWarmUpIdGlobal(undefined)
                    updateWarmUpUser(user.data)
                }else {
                    if(id == userId) {
                        const user = await axios.get(`/user/getOneUser/${userId}`)
                        updateWarmUpIdGlobal(undefined)
                        updateWarmUpUser(user.data)
                    }
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
        }
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}