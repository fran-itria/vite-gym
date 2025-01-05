import axios from "axios"
import { NavigateFunction } from "react-router-dom"

type acceptProps = {
    user: string | undefined
    email: string | undefined
    gym: string | undefined
    userId: string | null
    gymId: string | null
    navigate: NavigateFunction
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>
}

type rejectProps = {
    navigate: NavigateFunction
}

export const accept = async ({ email, gym, user, gymId, userId, navigate, setLoader }: acceptProps) => {
    try {
        setLoader('Aceptando usuario')
        const changeUser = await axios.put('/user', { id: userId, ban: null, newGymId: gymId })
        const mail = await axios.post('/mails/confirmChangeGymUser', { user, email, gym })
        if (mail.status == 200 && changeUser.status == 200) {
            setLoader(undefined)
            navigate('/')
        }
    } catch (error) {
        setLoader(undefined)
        window.alert('Error al aceptar usuario')
    }
}

export const reject = async ({ navigate }: rejectProps) => {
    navigate('/')
}