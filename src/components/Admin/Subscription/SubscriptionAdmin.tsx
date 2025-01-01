/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import subscription from "../../../services/subscription/subscription"
import axios from "axios"
import { useAppSelector } from "../../../hook/store"
import TablePayments from "./Table"
import { basicLoaders, specificLoaders } from "../../../const"



export default function SubscriptionAdmin({ setLoader }: { setLoader: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const { GymId } = useAppSelector(state => state.user)
    const [link, setLink] = useState<string>()
    const [payments, setPayments] = useState<{ id: string, date: string, hour: string, amount: string, User: { name: string, surname: string } }[]>()
    const [linkMp, setLinkMp] = useState<string>()
    const [amount, setAmount] = useState<number>()

    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.pay}s`)
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                setLinkMp(response.data.linkMp)
                setAmount(response.data.amount)
                setPayments(response.data.Payments)
                setLoader(undefined)
            })
            .catch(error => window.alert(error.data.Error))
    }, [GymId])

    return (
        <div className="h-full w-full mt-5 flex flex-col items-center">
            <form
                onSubmit={(e) => {
                    if (GymId && link) subscription({ e, link, id: GymId, setLinkMp, amount, setAmount })
                }}
                className="
                flex 
                flex-col
                justify-between 
                items-center 
                border
                border-2
                border-b-0
                border-cyan-700 
                rounded-t
                p-3  
                w-80 
                h-1/2"
            >
                <input
                    type="number"
                    required
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Monto:"
                >
                </input>
                <input
                    type="text"
                    required
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link de pago: "
                ></input>
                <button className="buttonConfirm w-24 mt-3">Confrimar</button>
            </form>
            {linkMp && amount ? (
                <div className="
                flex 
                flex-col 
                items-center 
                border 
                border-2
                border-t-0
                rounded-b 
                border-cyan-700
                w-80">
                    <b>Link actual: {linkMp} </b>
                    <b className="mb-3">Monto a pagar: {amount} </b>
                </div>) : <></>}
            {payments && payments?.length > 0 &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <TablePayments payments={payments} />
                </div>
            }
        </div>
    )
}