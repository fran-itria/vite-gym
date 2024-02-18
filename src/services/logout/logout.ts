import axios from "axios"
import { NavigateFunction } from "react-router-dom"

export const logout = async (id: string | null, navigate: NavigateFunction) => {
    try {
        const logoutUser = await axios.put('/user/logout', { id })
        if (logoutUser.status == 200) navigate('/')
        return logoutUser
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}