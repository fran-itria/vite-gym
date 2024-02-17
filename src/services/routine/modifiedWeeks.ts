/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"

export async function addWeek(id: string | undefined, weeks: number, routineActual: Function) {
    const actualRoutine = await axios.put('/rutina', { id, weeks })
    routineActual(actualRoutine.data)
}