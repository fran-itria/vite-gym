import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export default async function cahngePassword(
    e: React.FormEvent<HTMLFormElement>,
    newPassword: {
        password: string;
        confirmPassword: string;
    },
    user: {
        id: string,
        mail: string,
        user: string
    },
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>
) {
    e.preventDefault()
    setLoader("Cambiando contraseña")
    if (newPassword.password !== newPassword.confirmPassword) {
        setError("Las contraseñas no coinciden")
    }
    else {
        try {
            setError("")
            await axios.put(`/user`, { id: user.id, password: newPassword.password })
            await axios.post(`/mails/resetPassword`, { email: user.mail, user: user.user, password: newPassword.password })
            window.alert("Contraseña cambiada con éxito")
            navigate("/")
            setLoader(undefined)
        } catch (error) {
            setLoader(undefined)
            window.alert(error)
        }
    }
}