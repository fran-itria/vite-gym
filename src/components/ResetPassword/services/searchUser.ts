/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function searchUser(
    e: React.FormEvent<HTMLFormElement>,
    dni: string,
    setReset: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<{
        id: string;
        mail: string;
        user: string;
    }>>,
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>
) {
    e.preventDefault()
    setLoader("Buscando usuario")
    try {
        const user = await axios.get(`/user/getOneUserByDni/${dni}`)
        if (user.status == 200) {
            setUser(prev => { return { ...prev, id: user.data.id, mail: user.data.email, user: user.data.user } })
            setReset(true)
            setLoader(undefined)
        }
    } catch (error: any) {
        setLoader(undefined)
        window.alert(error.data.Error)
    }
}