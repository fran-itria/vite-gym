/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import subscription from "../../../services/subscription/subscription"
import axios from "axios"
import { useAppSelector } from "../../../hook/store"
import TablePayments from "./Table"
import { basicLoaders, specificLoaders } from "../../../const"
import resetValues from "../../../services/subscription/resetValuesSubscription"
import sweetAlert from "../../../services/swartAlert"



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
            .catch(error => sweetAlert(error.data.Error))
    }, [GymId])

    return (
        <div className="w-full h-full mt-5 flex flex-col items-center">
            <form
                onSubmit={(e) => {
                    if (GymId) subscription({ e, link, id: GymId, setLinkMp, amount, setAmount, setLoader })
                }}
                className={`
                flex 
                flex-col
                justify-between 
                items-center 
                border
                border-2
                ${linkMp || amount ? 'border-b-0' : 'border-b-2'}
                border-black
                dark:border-cyan-700 
                rounded-t
                p-3  
                w-80
                h-40`}
            >
                <input
                    type="number"
                    required
                    onChange={(e) => setAmount(Number(e.target.value))}
                    value={amount}
                    placeholder="Monto:"
                >
                </input>
                <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    value={linkMp}
                    placeholder="Link de pago: "
                ></input>
                <div className="flex justify-around w-full">
                    <button
                        className="buttonCancel w-24"
                        type="button"
                        onClick={(e) => resetValues({ id: GymId, e, setLinkMp, setAmount, setLoader })}
                    >
                        Restablecer
                    </button>
                    <button className="buttonConfirm w-24">Confrimar</button>
                </div>
            </form>
            {linkMp && amount && (
                <div className="
                flex 
                flex-col 
                items-center 
                border 
                border-2
                border-t-0
                rounded-b 
                border-black
                dark:border-cyan-700
                w-80">
                    <b className="text-black dark:text-white">Link actual: {linkMp} </b>
                    <b className="mb-3 text-black dark:text-white">Monto a pagar: {amount} </b>
                </div>
            )}
            {payments && payments?.length > 0 &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <TablePayments payments={payments} />
                </div>
            }
        </div>
    )
}