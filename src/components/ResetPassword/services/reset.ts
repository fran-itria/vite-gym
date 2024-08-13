import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export default async function cahngePassword(
    e: React.FormEvent<HTMLFormElement>,
    newPassword: {
        password: string;
        confirmPassword: string;
        code: number;
    },
    id: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>
) {
    e.preventDefault()
    setLoader("Cambiando contraseña")
    if (newPassword.password !== newPassword.confirmPassword) {
        setError("Las contraseñas no coinciden")
        setLoader(undefined)
    }
    else {
        try {
            setError("")
            const user = await axios.get(`/user/getOneUser/${id}`)
            if(user.status == 200 && newPassword.code == user.data.temporalCode){
                await axios.put(`/user`, { id, password: newPassword.password, temporalCode: null })
                window.alert("Contraseña cambiada con éxito")
                navigate("/")
                setLoader(undefined)
            } else {
                setError("Codigo incorrecto")
                setLoader(undefined)
            }
        } catch (error) {
            console.log(error)
            setLoader(undefined)
            window.alert(error)
        }
    }
}