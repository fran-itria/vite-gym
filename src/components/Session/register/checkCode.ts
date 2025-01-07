import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { User } from "../../../store/user/slice";
import { SetLoader } from "../../../types";
import sweetAlert from "../../../services/swartAlert";

export default async function checkCode(
    navigate: NavigateFunction,
    addUser: (inputs: User) => void,
    mail: string,
    temporalCode: string,
    setLoader: SetLoader
) {
    try {
        setLoader('Verificando código')
        const user = await axios.get(`/user/getOneUserByEmail/${mail}`)
        if (user.data.temporalCode == Number(temporalCode)) {
            await axios.put('/user', { id: user.data.id, temporalCode: null })
            addUser(user.data)
            setLoader(undefined)
            navigate(`/home/${user.data.id}/resumen`)
        }
        else {
            setLoader(undefined)
            throw new Error('Código incorrecto')
        }
    } catch (error: any) {
        sweetAlert(error);
    }
}