import axios from "axios"
import { confirmShift } from "../typeServices"

export const confirm = async({id, GymId, selectDay, setCreate, updateShiftsUser}: confirmShift) => {
    try {
        setCreate(true)
        const response = await axios.post('/shift', {day: selectDay.day, hour: selectDay.hour, userId: id, GymId})
        console.log(response.data)
        const user = await axios.get(`/user/getOneUser/${id}`)
        console.log(user.data)
        updateShiftsUser(user.data)
        setCreate(false)
    } catch (error) {
        console.log(error)
    }   
}