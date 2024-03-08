/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { updateLoadProps } from "../../typeServices"

export const updateLoad = async ({ id, newLoads, routineActual, routineId, setLoad, setLoading }: updateLoadProps) => {
    try {
        if (routineActual) {
            setLoading(true)
            await axios.put('/cargas', { id, newLoads })
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
            setLoad(false)
            setLoading(false)
        }
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.Error)
    }
}