import axios from "axios";
import { deleteRoutineProps, deleteWarmUpProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";

export async function deletRoutine({ id, userId, updateRoutinesUser, updateIdGlobal, setLoader }: deleteRoutineProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.routine}`)
        await axios.delete(`/rutina/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateRoutinesUser(user.data)
        updateIdGlobal(undefined)
        setLoader(undefined)
    } catch (error) {
        window.alert(error)
    }
}

export async function deleteWarmup({ id, userId, updateWarmUpUser, updateIdGlobal, setLoader }: deleteWarmUpProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.warm}`)
        await axios.delete(`/calentamiento/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateWarmUpUser(user.data)
        updateIdGlobal(undefined)
        setLoader(undefined)
    } catch (error) {
        window.alert(error)
    }
}