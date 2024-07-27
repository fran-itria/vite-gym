import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { User } from "../../../store/user/slice";

export default async function checkCode(
    navigate: NavigateFunction,
    addUser: (inputs: User) => void,
    mail: string,
    temporalCode: string,
    setLoader: React.Dispatch<React.SetStateAction<{
        state: boolean;
        reason?: string;
    }>>
) {
    try {
        setLoader({ state: true, reason: 'Verificando código' })
        const user = await axios.get(`/user/getOneUserByEmail/${mail}`)
        if (user.data.temporalCode == Number(temporalCode)) {
            await axios.put('/user', { id: user.data.id, temporalCode: null })
            addUser(user.data)
            setLoader({ state: false })
            navigate(`/home/${user.data.id}/resumen`)
        }
        else {
            setLoader({ state: false })
            throw new Error('Código incorrecto')
        }
    } catch (error) {
        window.alert(error);
    }
}