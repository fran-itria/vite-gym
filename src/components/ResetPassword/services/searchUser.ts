/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function searchUser(
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    setReset: React.Dispatch<React.SetStateAction<boolean>>,
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>,
    setIdUser: React.Dispatch<React.SetStateAction<string>>
) {
    e.preventDefault()
    setLoader("Buscando usuario")
    try {
        const user = await axios.get(`/user/getOneUserByEmail/${email}`)
        if (user.status == 200) {
            const randomCode = Math.floor(Math.random() * 1000000)
            await axios.post(`/mails/resetPassword`, {email, user: user.data.user, code: randomCode})
            await axios.put('/user', {id: user.data.id, temporalCode: randomCode})
            setIdUser(user.data.id)
            setReset(true)
            setLoader(undefined)
        }
    } catch (error: any) {
        setLoader(undefined)
        window.alert(error.data.Error)
        console.log(error)
        setLoader(undefined)
    }
}