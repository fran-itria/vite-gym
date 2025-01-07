/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { storage } from "../../const";
import { NavigateFunction } from "react-router-dom";
import sweetAlert from "../../services/swartAlert";

export const getGyms = async (setGyms: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
}[]>>) => {
    try {
        const response = await axios.get('/gym')
        setGyms(response.data)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}

export const change = async (id: string | null, valueGym: string | undefined, navigate: NavigateFunction) => {
    try {
        const response = await axios.post('/mails/confirmChangeGym', { idUser: id, idNewGym: valueGym })
        if (response.status == 200) {
            const gym: any = await axios.get(`/gym/getGymId/${valueGym}`)
            await axios.put(`/user`, { id, ban: `Debes esperar a que ${gym.data.name} acepte su solicitud`, login: false, pay: false })
            storage.removeItem('token')
            navigate('/')
        }
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}