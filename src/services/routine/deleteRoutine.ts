import axios from "axios";
import { Routine } from "../../store/routine/slice";
import { RoutinesUser } from "../../store/user/slice";

export default async function deletRoutine({ id, routineActual, userId, actualiceRoutinesUser }: {
    id: string | undefined,
    routineActual: (Days: Routine) => void
    actualiceRoutinesUser: (routine: RoutinesUser) => void
    userId: string | null
}) {
    try {
        const response = await axios.delete(`/rutina/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        if (response.status == 200) window.alert(response.data.Message)
        routineActual({ weeks: 0, Days: undefined })
        actualiceRoutinesUser(user.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}