import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { storage } from "../../const"

export const logout = async (id: string | null, navigate: NavigateFunction) => {
    try {
        const logoutUser = await axios.put('/user/logout', { id })
        if (logoutUser.status == 200) {
            storage.removeItem('user')
            storage.removeItem('email')
            storage.removeItem('password')
            navigate('/')
        }
        return logoutUser
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}