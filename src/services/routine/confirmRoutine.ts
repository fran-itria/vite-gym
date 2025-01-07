/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { confirmRoutineProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"
import sweetAlert from "../swartAlert"

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
    email,
    setEdit
}: confirmRoutineProps) {
    try {
        setOpenCreateRouitine(false)
        setLoader(`${basicLoaders.create} ${!createWarm ? specificLoaders.routine : specificLoaders.warm}`)
        if (!createWarm) {
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
        } else {
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
        }
        if (setEdit) {
            const user = await axios.get(`/user/getOneUser/${userId}`)
            setEdit({ state: true, warmUps: user.data.WarmUps, routines: user.data.Routines })
        }
        if (email) {
            await axios.post('/mails/newRoutine', { email, routine: createWarm ? 'calentamiento' : 'rutina' })
        }
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}