import axios from "axios";
import { deleteSubscriptionProps } from "../typeServices";


export default async function deleteSubscription({ id, updatePaymentsUser, userId }: deleteSubscriptionProps) {
    try {
        await axios.delete(`payments/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updatePaymentsUser(user.data)
    } catch (error) {
        console.log(error)
    }
}