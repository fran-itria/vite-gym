import axios from "axios";
import { deleteSubscriptionProps } from "../typeServices";


export default async function deleteSubscription({ id, updatePaymentsUser, userId, setRemove }: deleteSubscriptionProps) {
    try {
        setRemove(true)
        await axios.delete(`payments/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updatePaymentsUser(user.data)
        setRemove(false)
    } catch (error) {
        console.log(error)
    }
}