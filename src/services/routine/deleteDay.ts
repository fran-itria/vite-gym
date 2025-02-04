/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios"
import { deleteDayProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"
import sweetAlert from "../swartAlert"

export default async function deleteDay({ id, routineId, routineActual, warmUpId, warmUpActual, setRoutineAdmin, setLoader }: deleteDayProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.day}`)
        await axios.delete(`/day/delete/${id}`)
        if (setRoutineAdmin) {
            if (routineActual) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else if (warmUpActual) {
                const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
                warmUpActual(warmUp.data)
            }
        }
        else if (routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)

        }
        else if (warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.response.data.Error)
    }
}