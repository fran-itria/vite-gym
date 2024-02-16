import axios from "axios";
import { Routine } from "../../store/routine/slice";

export default async function deletRoutine(id: string | undefined, routineActual: (Days: Routine) => void) {
    try {
        const response = await axios.delete(`/rutina/delete/${id}`)
        if (response.status == 200) window.alert(response.data.Message)
        routineActual({ weeks: 0, Days: undefined })
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}