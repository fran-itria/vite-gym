/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { UsersComponent } from "../../../types"
import { basicLoaders, specificLoaders } from "../../../const"

export default function useUsers() {
    const [users, setUsers] = useState<UsersComponent>([])
    const [copy, setCopy] = useState<UsersComponent>([])
    const { Gym } = useAppSelector(state => state.user)
    const [edit, setEdit] = useState<{ state: boolean, warmUps?: number, routines?: number }>({ state: false })
    const [userId, setUserId] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [admin, setAdmin] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<boolean>(false)
    const [ban, setBan] = useState<string | null | boolean>(null)
    const [loader, setLoader] = useState<string>()

    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.users}`)
        axios.get(`/user/forGym/${Gym?.name}`)
            .then(
                response => {
                    if (response.status == 200) {
                        setUsers(response.data)
                        setCopy(response.data)
                        setLoader(undefined)
                    }
                }
            )
    }, [Gym])

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
        setLoader,
        copy,
        email,
        setEmail
    }
}