/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"

export async function addWeek(id: string, weeks: number, routineActual: Function) {
    const actualRoutine = await axios.put('/rutina', { id, weeks })
    routineActual(actualRoutine.data)
}

export async function deleteWeek(id: string, weeks: number, routineActual: Function) {
    if (weeks > 0) {
        const actualRoutine = await axios.put('/rutina', { id, weeks })
        routineActual(actualRoutine.data)
    } else window.alert('No se puede tener menos de 1 semana')
}