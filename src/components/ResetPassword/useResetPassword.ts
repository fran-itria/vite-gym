import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function useResetPassword() {
    const [reset, setReset] = useState<boolean>(false)
    const [dni, setDni] = useState<string>("")
    const [user, setUser] = useState<{ id: string, mail: string, user: string }>({ id: "", mail: "", user: "" })
    const [newPassword, setNewPassword] = useState<{ password: string, confirmPassword: string }>({
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const [loader, setLoader] = useState<string>()

    return {
        reset,
        setReset,
        dni,
        setDni,
        user,
        setUser,
        newPassword,
        setNewPassword,
        error,
        setError,
        navigate,
        loader,
        setLoader
    }
}