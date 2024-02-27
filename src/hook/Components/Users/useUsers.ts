import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { UsersComponent } from "../../../types"

export default function useUsers(){
    const [users, setUsers] = useState<UsersComponent>([])
    const { Gym } = useAppSelector(state => state.user)
    const [edit, setEdit] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')
    const [admin, setAdmin] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<boolean>(false)
    const [ban, setBan] = useState<boolean>(false)
    useEffect(() => {
        console.log(Gym)
        axios.get(`/user/forGym/${Gym?.name}`).then(
            response => {
                if (response.status == 200) {
                    setUsers(response.data)
                }
            }
        )
    }, [])

    return {
        users,
        setUsers,
        Gym,
        edit,
        setEdit,
        userId,
        setUserId,
        admin,
        setAdmin,
        subscription,
        setSubscription,
        ban,
        setBan
    }
}