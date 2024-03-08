import axios from "axios"
import moment from "moment"
import { createPaymentProps } from "../typeServices"


export default async function createPayment({ GymId, id, updatePaymentsUser, amount }: createPaymentProps) {
    const date = moment().format().split('T')[0]
    const hour = `${moment().hour()}:${moment().minute()}`
    await axios.post('/payments', { UserId: id, GymId, date, hour, amount })
    const user = await axios.get(`/user/getOneUser/${id}`)
    updatePaymentsUser(user.data.Payments)
}