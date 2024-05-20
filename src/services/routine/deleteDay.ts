/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"
import { deleteDayProps } from "../typeServices"

export default async function deleteDay({ id, routineId, routineActual, warmUpId, warmUpActual, setRoutineAdmin, setWarmUpAdmin }: deleteDayProps) {
    try {
        const response = await axios.delete(`/day/delete/${id}`)
        if (response.status == 200) window.alert(response.data.Message)
        if (setRoutineAdmin) {
            const routine = await axios.get(`/rutina/${routineId}`)
            setRoutineAdmin(routine.data)
        }
        if (setWarmUpAdmin) {
            const warmUp = await axios.get(`/calentamiento/${routineId}`)
            setWarmUpAdmin(warmUp.data)
        }
        if (routineId && routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        } else if (warmUpId && warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}