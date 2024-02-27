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
}: confirmRoutineProps) {
    try {
        if (!createWarm) {
            await axios.post("/rutina/createRutina", { userId, days })
            const user = await axios.get(`/user/getOneUser/${userId}`)
            window.alert('Rutina creada exitosamente')
            if(updateIdGlobal && updateRoutinesUser) {
              updateIdGlobal(undefined)
              updateRoutinesUser(user.data)
              if(setUsers){
                  const users = await axios.get(`/user/forGym/${gymName}`)
                  setUsers(users.data)
              }
            }
        } else {
            await axios.post('/calentamiento/createCalentamiento', { userId, days })
            const user = await axios.get(`/user/getOneUser/${userId}`)
            window.alert('Calentamiento creado exitosamente')
            if(updateWarmUpUser && updateWarmUpIdGlobal) {
              updateWarmUpIdGlobal(undefined)
              updateWarmUpUser(user.data)
              if (setUsers) {
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