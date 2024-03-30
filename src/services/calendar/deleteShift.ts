/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteShiftProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";


export default async function deleteShift({ shiftId, updateShiftsUser, userId, setLoader }: deleteShiftProps) {
    try {
        setLoader({ state: true, reason: `${basicLoaders.remove} ${specificLoaders.shift}` })
        await axios.delete(`/shift/delete/${shiftId}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateShiftsUser(user.data.Shifts)
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.data.Error)
    }
}