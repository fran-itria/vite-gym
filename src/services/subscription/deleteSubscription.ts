/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteSubscriptionProps } from "../typeServices";


export default async function deleteSubscription({ id, updatePaymentsUser, userId, setRemove }: deleteSubscriptionProps) {
    try {
        setRemove(true)
        await axios.delete(`payments/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updatePaymentsUser(user.data.Payments)
        setRemove(false)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}