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
            if(id == userId && updateIdGlobal && updateRoutinesUser) {
              const user = await axios.get(`/user/getOneUser/${userId}`)
              updateIdGlobal(undefined)
              updateRoutinesUser(user.data)
            }
            if(setUsers){
                const users = await axios.get(`/user/forGym/${gymName}`)
                setUsers(users.data)
            }
        } else {
            await axios.post('/calentamiento/createCalentamiento', { userId, days })
            window.alert('Calentamiento creado exitosamente')
            if(id == userId && updateWarmUpUser && updateWarmUpIdGlobal) {
              const user = await axios.get(`/user/getOneUser/${userId}`)
              updateWarmUpIdGlobal(undefined)
              updateWarmUpUser(user.data)
            }
            if (setUsers) {
              const users = await axios.get(`/user/forGym/${gymName}`)
              setUsers(users.data)
            }
        }
        setOpenCreateRouitine(prevState => !prevState)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}