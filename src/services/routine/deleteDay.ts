/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"
import { deleteDayProps } from "../typeServices"
import { CaseResolve } from "../../types"

export default async function deleteDay({ id, routineId, routineActual, setRoutineAdmin, caseResolve }: deleteDayProps) {
    try {
        const response = await axios.delete(`/day/delete/${id}`)
        if (response.status == 200) window.alert(response.data.Message)
        if (setRoutineAdmin && routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const warmUp = await axios.get(`/calentamiento/${routineId}`)
                routineActual(warmUp.data)
            }
        }
        else if (routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const warmUp = await axios.get(`/calentamiento/${routineId}`)
                routineActual(warmUp.data)
            }
        }
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}