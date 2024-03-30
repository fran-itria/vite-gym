/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteSubscriptionProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";


export default async function deleteSubscription({ id, updatePaymentsUser, userId, setLoader }: deleteSubscriptionProps) {
    try {
        setLoader({ state: true, reason: `${basicLoaders.remove} ${specificLoaders.pay}` })
        await axios.delete(`payments/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updatePaymentsUser(user.data.Payments)
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}