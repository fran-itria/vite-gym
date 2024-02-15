/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"

export default async function addWeek(id: string, weeks: number, routineActual: Function) {
    console.log(`Agregando una semana, semanas totales ${weeks}`)
    const actualRoutine = await axios.put('/rutina', { id, weeks })
    routineActual(actualRoutine.data)
}