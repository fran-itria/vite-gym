import axios from "axios"
import { confirmShift } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

export const confirm = async ({ id, GymId, selectDay, setLoader, updateShiftsUser }: confirmShift) => {
    try {
        setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.shift}` })
        const response = await axios.post('/shift', { day: selectDay.day, hour: selectDay.hour, userId: id, GymId })
        console.log(response.data)
        const user = await axios.get(`/user/getOneUser/${id}`)
        console.log(user.data)
        updateShiftsUser(user.data.Shifts)
        setLoader({ state: false })
    } catch (error) {
        console.log(error)
    }
}