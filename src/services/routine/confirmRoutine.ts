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
    setLoader,
    email,
    setEdit
}: confirmRoutineProps) {
    try {
        setOpenCreateRouitine(false)
        setLoader(`${basicLoaders.create} ${!createWarm ? specificLoaders.routine : specificLoaders.warm}`)
        if (!createWarm) {
            const routine = await axios.post("/rutina/createRutina", { userId, days })
            const user = await axios.get(`/user/getOneUser/${userId}`)
            if (updateRoutinesUser) {
                updateIdGlobal(routine.data.id)
                updateRoutinesUser(user.data)
                if (setUsers) {
                    const users = await axios.get(`/user/forGym/${gymName}`)
                    setUsers(users.data)
                }
            }
        } else {
            const warmUp = await axios.post('/calentamiento/createCalentamiento', { userId, days })
            const user = await axios.get(`/user/getOneUser/${userId}`)
            if (updateWarmUpUser) {
                updateIdGlobal(warmUp.data.id)
                updateWarmUpUser(user.data)
                if (setUsers) {
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
        window.alert(error.response.data.Error)
    }
}