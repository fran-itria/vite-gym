/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteSubscriptionProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../swartAlert";


export default async function deleteSubscription({ id, updatePaymentsUser, userId, setLoader }: deleteSubscriptionProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.pay}`)
        await axios.delete(`payments/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updatePaymentsUser(user.data.Payments)
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}