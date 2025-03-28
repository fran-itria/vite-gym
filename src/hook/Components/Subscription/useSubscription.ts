/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../store"
import { useUserActions } from "../../useUserActions"
import { basicLoaders, specificLoaders, storage } from "../../../const"
import { login } from "../../../services/login/login"
import createPayment from "../../../services/subscription/createPayment"
import { payments } from "../../../store/user/slice"
import sweetAlert from "../../../services/swartAlert"
import moment from "moment"

export default function useSubscription() {
    const { admin, GymId, id, Payments, Gym } = useAppSelector(state => state.user)
    const { updatePaymentsUser, addUser, updatePayUser } = useUserActions()
    const [linkMp, setLinkMp] = useState<string>()
    const [amount, setAmount] = useState<string>()
    const query = useLocation()
    const [loader, setLoader] = useState<string>()
    const [arrayPayments, setArrayPayments] = useState<payments[] | []>([])
    const [payTrue, setPayTrue] = useState<boolean>(false)

    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.pay}`)
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                setLinkMp(response.data.linkMp)
                setAmount(response.data.amount)
                setLoader(undefined)
            })
    }, [GymId])

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(query.search)
            const approved = params.get('collection_status')
            const token = storage.getItem('token')
            try {
                if (!GymId && token) {
                    const init = await login(undefined, token)
                    addUser(init.data.user)
                } else if (approved && amount) {
                    setLoader(`${basicLoaders.create} ${specificLoaders.pay}`)
                    await createPayment({ amount, GymId, id, updatePaymentsUser })
                    const user = await axios.put('/user', { id, pay: true })
                    updatePayUser(user.data.pay)
                    setLoader(undefined)
                }
            } catch (error: any) {
                sweetAlert(error.data.Error)
            }
        })()
    }, [amount])

    useEffect(() => {
        const array = Payments.filter(payment => payment.Gym.name == Gym?.name)
        const month = moment().month()
        const year = moment().year()
        for (let i = 0; i < array.length; i++) {
            const date = array[i].date;
            if (date.includes(String(month + 1)) && date.includes(String(year))) {
                setPayTrue(true)
            }
        }
        setArrayPayments(array)
    }, [Payments])

    return { admin, Payments, linkMp, amount, loader, setLoader, arrayPayments, payTrue }
}