/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteShiftProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../swartAlert";


export default async function deleteShift({ shiftId, updateShiftsUser, userId, setLoader }: deleteShiftProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.shift}`)
        await axios.delete(`/shift/delete/${shiftId}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateShiftsUser(user.data.Shifts)
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.data.Error)
    }
}