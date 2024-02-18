import axios from "axios";
import { deleteRoutineProps } from "../typeServices";

export default async function deletRoutine({ id, routineActual, userId, updateRoutinesUser }: deleteRoutineProps) {
    try {
        const response = await axios.delete(`/rutina/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        if (response.status == 200) window.alert(response.data.Message)
        routineActual({ weeks: 0, Days: undefined })
        updateRoutinesUser(user.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}