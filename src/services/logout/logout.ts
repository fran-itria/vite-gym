/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { basicLoaders, storage } from "../../const"
import { SetLoader } from "../../types"

export const logout = async (id: string | null, navigate: NavigateFunction, setLoader: SetLoader) => {
    try {
        setLoader(basicLoaders.out)
        const logoutUser = await axios.put('/user/logout', { id })
        if (logoutUser.status == 200) {
            storage.removeItem('user')
            storage.removeItem('email')
            storage.removeItem('password')
            navigate('/')
        }
        return logoutUser
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}