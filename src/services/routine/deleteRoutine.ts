import axios from "axios";
import { deleteRoutineProps, deleteWarmUpProps } from "../typeServices";

export async function deletRoutine({ id, userId, updateRoutinesUser, updateIdGlobal}: deleteRoutineProps) {
    try {
        const response = await axios.delete(`/rutina/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        if (response.status == 200) window.alert(response.data.Message)
        updateRoutinesUser(user.data)
        updateIdGlobal(undefined)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}

export async function deleteWarmup({ id, userId, updateWarmUpUser, updateWarmUpIdGlobal}: deleteWarmUpProps) {
    try {
        const response = await axios.delete(`/calentamiento/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        if (response.status == 200) window.alert(response.data.Message)
        updateWarmUpUser(user.data)
        updateWarmUpIdGlobal(undefined)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}