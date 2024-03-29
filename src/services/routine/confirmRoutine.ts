/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { confirmRoutineProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

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
    id,
    setLoader
}: confirmRoutineProps) {
    try {
        setOpenCreateRouitine(false)
        if (!createWarm) {
            setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.routine}` })
            const routine = await axios.post("/rutina/createRutina", { userId, days })
            if (updateRoutinesUser && updateIdGlobal) {
                if (!setUsers) {
                    const user = await axios.get(`/user/getOneUser/${userId}`)
                    updateIdGlobal(routine.data.id)
                    updateRoutinesUser(user.data)
                } else {
                    if (id == userId) {
                        const user = await axios.get(`/user/getOneUser/${userId}`)
                        updateIdGlobal(routine.data.id)
                        updateRoutinesUser(user.data)
                    }
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
        } else {
            setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.warm}` })
            const warmUp = await axios.post('/calentamiento/createCalentamiento', { userId, days })
            if (updateWarmUpUser && updateWarmUpIdGlobal) {
                if (!setUsers) {
                    const user = await axios.get(`/user/getOneUser/${userId}`)
                    updateWarmUpIdGlobal(warmUp.data.id)
                    updateWarmUpUser(user.data)
                } else {
                    if (id == userId) {
                        const user = await axios.get(`/user/getOneUser/${userId}`)
                        updateWarmUpIdGlobal(warmUp.data.id)
                        updateWarmUpUser(user.data)
                    }
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
        }
        setLoader({ state: false })
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}