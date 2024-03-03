import { useAppSelector } from "../../store"
import SubscriptionAdmin from "../../../components/Admin/Subscription/SubscriptionAdmin"
import { useUserActions } from "../../useUserActions"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Subscription(){
    const { admin, GymId } = useAppSelector(state => state.user)
    const { updatePaymentsUser } = useUserActions()
    const [linkMp, setLinkMp] = useState<string>()

    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`)
        .then(response => setLinkMp(response.data.linkMp))
    }, [])

    return (
        admin ? 
            <SubscriptionAdmin /> 
            : 
            <>
                <p>Desea pagar</p>
                <button style={{background: '#009ee3', color: 'white'}}>
                    <a href={linkMp} target="_blank">
                        Pagar 
                    </a>
                </button>
            </>
    )
}

/*
    Chequear si esxiste algun pago con ese mes y año, si existe anular el boton de pago
*/