import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { accept, reject } from "./services"
import Loader from "../Loader"

export default function AcceptUser() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const userId = params.get('userId')
    const gymId = params.get('gymId')
    const [user, setUser] = useState<{ name?: string, surname?: string, user?: string, email?: string }>({})
    const [gym, setGym] = useState<string>()
    const navigate = useNavigate()
    const [loader, setLoader] = useState<string | undefined>(undefined)

    useEffect(() => {
        axios.get(`/user/getOneUser/${userId}`).then(res => {
            const name = res.data.name
            const surname = res.data.surname
            const user = res.data.user
            const email = res.data.email
            setUser(prev => { return { ...prev, name, surname, user, email } })
        })
        axios.get(`/gym/getGymId/${gymId}`).then(res => {
            const name = res.data.name
            setGym(name)
        })
    }, [])

    return (
        <>
            {loader && <Loader text={loader} />}
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="background p-4 rounded flex flex-col items-center justify-around h-40">
                    <b className="text-lg">{user.name} {user.surname} quiere incorporarse a {gym}</b>
                    <b>¿Desea aceptarlo?</b>
                    <div className="w-full flex justify-around">
                        <button onClick={() => reject({ navigate })} className="buttonCancel w-24">Rechazar</button>
                        <button onClick={() => accept({ email: user.email, gym, user: user.user, gymId, userId, navigate, setLoader })} className="buttonConfirm w-24">Aceptar</button>
                    </div>
                </div>
            </div>
        </>
    )
}