import axios from "axios";
import { deleteRoutineProps, deleteWarmUpProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../swartAlert";

export async function deletRoutine({ id, userId, updateRoutinesUser, updateIdGlobal, setLoader, setUsers }: deleteRoutineProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.routine}`)
        await axios.delete(`/rutina/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateRoutinesUser(user.data)
        if (setUsers) {
            const users = await axios.get(`/user/forGym/${user.data.Gym.name}`)
            setUsers(users.data)
        }
        updateIdGlobal(undefined)
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error)
    }
}

export async function deleteWarmup({ id, userId, updateWarmUpUser, updateIdGlobal, setLoader, setUsers }: deleteWarmUpProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.warm}`)
        await axios.delete(`/calentamiento/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateWarmUpUser(user.data)
        if (setUsers) {
            const users = await axios.get(`/user/forGym/${user.data.Gym.name}`)
            setUsers(users.data)
            updateIdGlobal(undefined)
        }
        updateIdGlobal(undefined)
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error)
    }
}