/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { UsersComponent } from "../../../types"
import useLoaders from "../useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"

export default function useUsers() {
    const [users, setUsers] = useState<UsersComponent>([])
    const { Gym } = useAppSelector(state => state.user)
    const [edit, setEdit] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')
    const [admin, setAdmin] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<boolean>(false)
    const [ban, setBan] = useState<boolean>(false)
    const { loader, setLoader } = useLoaders()

    useEffect(() => {
        setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.users}` })
        axios.get(`/user/forGym/${Gym?.name}`)
            .then(
                response => {
                    if (response.status == 200) {
                        setUsers(response.data)
                        setLoader({ state: false })
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
        setBan,
        loader,
        setLoader
    }
}