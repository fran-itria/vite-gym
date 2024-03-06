/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import subscription from "../../../services/subscription/subscription"
import axios from "axios"
import { useAppSelector } from "../../../hook/store"
import TablePayments from "./Table"



export default function SubscriptionAdmin() {
    const { GymId } = useAppSelector(state => state.user)
    const [link, setLink] = useState<string>()
    const [payments, setPayments] = useState<{ id: string, date: string, hour: string, amount: string, User: { name: string, surname: string } }[]>()
    const [linkMp, setLinkMp] = useState<string>()
    const [amount, setAmount] = useState<number>()

    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                setLinkMp(response.data.linkMp)
                setAmount(response.data.amount)
                setPayments(response.data.Payments)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <form onSubmit={(e) => {
                if (GymId && link) subscription({ e, link, id: GymId, setLinkMp, amount, setAmount })
            }}>
                <label>
                    Monto:
                    <input type="number" required onChange={(e) => setAmount(Number(e.target.value))}></input>
                </label>
                <label>
                    Link de pago:
                    <input type="text" required onChange={(e) => setLink(e.target.value)}></input>
                </label>
                <button>Confrimar</button>
            </form>
            {linkMp && amount ? (
                <>
                    <p>Link de pago actual: <b> {linkMp} </b> </p>
                    <p>Monto a pagar: <b>{amount}</b></p>
                </>) : <></>}
            {payments && payments?.length > 0 ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <TablePayments payments={payments} />
                </div>
                :
                <p>No hay pagos registrados</p>
            }
        </>
    )
}