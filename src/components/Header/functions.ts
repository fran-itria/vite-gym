/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { storage } from "../../const";
import { NavigateFunction } from "react-router-dom";

export const getGyms = async (setGyms: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
}[]>>) => {
    try {
        const response = await axios.get('/gym')
        setGyms(response.data)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}

export const change = async (id: string | null, valueGym: string | undefined, navigate: NavigateFunction) => {
    try {
        const response = await axios.post('/mails/confirmChangeGym', { idUser: id, idNewGym: valueGym })
        if (response.status == 200) {
            const gym: any = await axios.get(`/gym/getGymId/${valueGym}`)
            await axios.put(`/user`, { id, ban: `Debes esperar a que ${gym.data.name} acepte su solicitud`, login: false })
            storage.removeItem('user')
            storage.removeItem('email')
            storage.removeItem('password')
            navigate('/')
        }
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}