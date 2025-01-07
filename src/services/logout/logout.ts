/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { basicLoaders, storage } from "../../const"
import { SetLoader } from "../../types"
import sweetAlert from "../swartAlert"

export const logout = async (id: string | null, navigate: NavigateFunction, setLoader: SetLoader) => {
    try {
        setLoader(basicLoaders.out)
        const logoutUser = await axios.put('/user/logout', { id })
        if (logoutUser.status == 200) {
            storage.removeItem('token')
            navigate('/')
        }
        return logoutUser
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}