/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"

export default async function deleteDay(id: string | undefined, routineId: string | undefined, routineActual: Function) {
    try {
        const response = await axios.delete(`/day/delete/${id}`)
        const routine = await axios.get(`/rutina/${routineId}`)
        if (response.status == 200) window.alert(response.data.Message)
        routineActual(routine.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}