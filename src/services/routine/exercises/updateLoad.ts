/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { updateLoadProps } from "../../typeServices"
import { basicLoaders, specificLoaders } from "../../../const"

export const updateLoad = async ({ id, newLoads, routineActual, routineId, setLoad, setLoader }: updateLoadProps) => {
    try {
        if (routineActual) {
            setLoad(false)
            setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.load}` })
            await axios.put('/cargas', { id, newLoads })
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
            setLoader({ state: false })
        }
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.Error)
    }
}