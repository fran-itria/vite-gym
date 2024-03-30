/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { submitChangesProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

export default async function submitChanges({ e, setLoader, gymName, inputs, setUsers, userId, setEdit }: submitChangesProps) {
    e.preventDefault()
    try {
        setEdit(false)
        setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.cahnges}` })
        await axios.put('/user', { ...inputs, id: userId })
        const users = await axios.get(`/user/forGym/${gymName}`)
        setLoader({ state: false })
        setUsers(users.data)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}