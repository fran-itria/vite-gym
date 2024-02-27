/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { submitChangesProps } from "../typeServices"

export default async function submitChanges({e, setPending, gymName, inputs, setUsers, userId, setEdit}: submitChangesProps){
    e.preventDefault()
    try {
        await axios.put('/user', { ...inputs, id: userId})
        setPending(true)
        const users = await axios.get(`/user/forGym/${gymName}`)
        if(users.status == 200) {
            setUsers(users.data)
            setPending(false)
            setEdit(false)
        }
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
}