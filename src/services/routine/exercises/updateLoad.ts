import axios from "axios"
import { Routine } from "../../../store/routine/slice"

export const updateLoad = async (id: string, newLoads: string, routineActual?: ((Days: Routine) => void), routineId?: string) => {
    try {
        if (routineActual && routineId) {
            const load = await axios.put('/cargas', { id, newLoads })
            console.log(load)
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        }
    } catch (error) {
        console.log(error)
    }
}