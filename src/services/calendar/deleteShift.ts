import axios from "axios";
import { deleteShiftProps } from "../typeServices";


export default async function deleteShift({shiftId, updateShiftsUser, userId, setRemove}: deleteShiftProps){
    try {
        setRemove(true)
        await axios.delete(`/shift/delete/${shiftId}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateShiftsUser(user.data)
        setRemove(false)
    } catch (error) {
        console.log(error)
    }
}