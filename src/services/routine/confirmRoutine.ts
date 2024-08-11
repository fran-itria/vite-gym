/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { confirmRoutineProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

export default async function confirmRoutine({
    updateRoutinesUser,
    updateIdGlobal,
    updateWarmUpUser,
    setOpenCreateRouitine,
    setUsers,
    days,
    userId,
    gymName,
    createWarm,
    id,
    setLoader,
    email
}: confirmRoutineProps) {
    try {
        setOpenCreateRouitine(false)
        if (!createWarm) {
            setLoader(`${basicLoaders.create} ${specificLoaders.routine}`)
            const routine = await axios.post("/rutina/createRutina", { userId, days })
            if (updateRoutinesUser) {
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
            if(email){
                await axios.post('/mails/newRoutine', {email, routine: 'rutina'})
            }
        } else {
            setLoader(`${basicLoaders.create} ${specificLoaders.warm}`)
            const warmUp = await axios.post('/calentamiento/createCalentamiento', { userId, days })
            if (updateWarmUpUser) {
                if (!setUsers) {
                    const user = await axios.get(`/user/getOneUser/${userId}`)
                    updateIdGlobal(warmUp.data.id)
                    updateWarmUpUser(user.data)
                } else {
                    if (id == userId) {
                        const user = await axios.get(`/user/getOneUser/${userId}`)
                        updateIdGlobal(warmUp.data.id)
                        updateWarmUpUser(user.data)
                    }
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
            if(email){
                await axios.post('/mails/newRoutine', {email, routine: 'calentamiento'})
            }
        }
        setLoader(undefined)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}