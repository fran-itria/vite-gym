/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"
import { deleteDayProps } from "../typeServices"
import { CaseResolve } from "../../types"
import { basicLoaders, specificLoaders } from "../../const"

export default async function deleteDay({ id, routineId, routineActual, setRoutineAdmin, caseResolve, setLoader }: deleteDayProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.day}`)
        await axios.delete(`/day/delete/${id}`)
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
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        window.alert(error.response.data.Error)
    }
}