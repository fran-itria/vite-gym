/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import sweetAlert from "../../../services/swartAlert";

export default async function searchUser(
    e: React.FormEvent<HTMLFormElement>,
    email: string | null,
    emailInput: string,
    setReset: React.Dispatch<React.SetStateAction<boolean>>,
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>,
    setIdUser: React.Dispatch<React.SetStateAction<string>>,
    fromForm?: boolean
) {
    e.preventDefault()
    setLoader("Buscando usuario")
    try {
        if (email == emailInput) {
            const user = await axios.get(`/user/getOneUserByEmail/${emailInput}`)
            if (user.status == 200) {
                const randomCode = Math.floor(Math.random() * 1000000)
                await axios.post(`/mails/resetPassword`, { email, user: user.data.user, code: randomCode })
                await axios.put('/user', { id: user.data.id, temporalCode: randomCode })
                setIdUser(user.data.id)
                setReset(true)
                setLoader(undefined)
            }
        } else if (fromForm) {
            const user = await axios.get(`/user/getOneUserByEmail/${emailInput}`)
            console.log(user)
            if (user.status == 200) {
                const randomCode = Math.floor(Math.random() * 1000000)
                await axios.post(`/mails/resetPassword`, { email, user: user.data.user, code: randomCode })
                await axios.put('/user', { id: user.data.id, temporalCode: randomCode })
                setIdUser(user.data.id)
                setReset(true)
                setLoader(undefined)
            }
        }
        else {
            setLoader(undefined)
            throw new Error('No se encuentra correo asociado a su cuenta')
        }
    } catch (error: any) {
        setLoader(undefined)
        if (!error.data) {
            sweetAlert(error)
        } else sweetAlert(error.data.Error)
    }
}