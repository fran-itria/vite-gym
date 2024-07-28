/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { confirmShift } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

export const confirm = async ({ id, GymId, selectDay, setLoader, updateShiftsUser }: confirmShift) => {
    try {
        setLoader(`${basicLoaders.create} ${specificLoaders.shift}`)
        await axios.post('/shift', { day: selectDay.day, hour: selectDay.hour, userId: id, GymId })
        const user = await axios.get(`/user/getOneUser/${id}`)
        updateShiftsUser(user.data.Shifts)
        setLoader(undefined)
    } catch (error: any) {
        window.alert(error.data.Error)
    }
}