import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hook/store"


export default function useResetPassword() {
    const { email } = useAppSelector(state => state.user)
    const [reset, setReset] = useState<boolean>(false)
    const [emailInput, setEmailInput] = useState<string>("")
    const [idUser, setIdUser] = useState<string>("")
    const [newPassword, setNewPassword] = useState<{ password: string, confirmPassword: string, code: number }>({
        password: "",
        confirmPassword: "",
        code: 0
    })
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const [loader, setLoader] = useState<string>()

    return {
        reset,
        setReset,
        email,
        emailInput,
        setEmailInput,
        idUser,
        setIdUser,
        newPassword,
        setNewPassword,
        error,
        setError,
        navigate,
        loader,
        setLoader
    }
}