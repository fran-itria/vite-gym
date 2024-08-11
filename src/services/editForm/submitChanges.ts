/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { submitChangesProps } from "../typeServices"
import { basicLoaders, specificLoaders } from "../../const"

export default async function submitChanges({ e, setLoader, gymName, inputs, setUsers, userId, setEdit, email }: submitChangesProps) {
    e.preventDefault()
    console.log(inputs)
    try {
        setEdit(false)
        setLoader(`${basicLoaders.save} ${specificLoaders.cahnges}`)
        await axios.put('/user', { ...inputs, id: userId })
        if(inputs?.ban){
            await axios.post('/mails/banUser', {email, ban: inputs?.ban, gym: gymName})
        }
        const users = await axios.get(`/user/forGym/${gymName}`)
        setLoader(undefined)
        setUsers(users.data)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}