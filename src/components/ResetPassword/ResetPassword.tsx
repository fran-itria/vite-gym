import searchUser from "./services/searchUser"
import cahngePassword from "./services/reset"
import useResetPassword from "./useResetPassword"
import Loader from "../Loader"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";

export default function ResetPassword({ setResetPassword }: { setResetPassword?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {
        reset,
        setReset,
        email,
        setEmail,
        idUser,
        setIdUser,
        newPassword,
        setNewPassword,
        error,
        setError,
        navigate,
        loader,
        setLoader
    } = useResetPassword()
    const [inputTypeOne, setInputTypeOne] = useState("password")
    const [inputTypeTwo, setInputTypeTwo] = useState("password")

    return (

        <div className="background flex flex-col rounded p-4">
            {loader ? <Loader text={loader} /> : <></>}
            <b className="mb-3">Recuperar contraseña</b>
            {!reset ?
                <div>
                    <b>
                        Ingrese el correo electronico asociado a su cuenta
                    </b>
                    <form
                        className="flex flex-col items-center mt-3"
                        onSubmit={(e) => searchUser(e, email, setReset, setLoader, setIdUser)}
                    >
                        <input
                            autoFocus
                            className="w-50"
                            placeholder="Correo electronico"
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <div className="flex justify-around mt-3 w-full">
                            <button
                                className="buttonCancel w-24"
                                type="button"
                                onClick={() => { if (setResetPassword) setResetPassword(false) }}
                            >
                                Cancelar
                            </button>
                            <button className="buttonConfirm w-24">Buscar</button>
                        </div>
                    </form>
                </div>
                :
                <form
                    className="flex flex-col items-start justify-between h-40 ll:h-60"
                    onSubmit={(e) => cahngePassword(e, newPassword, idUser, setError, navigate, setLoader)}>
                    <label className="font-bold ll:flex ll:flex-col relative">
                        Nueva contraseña:
                        <input
                            className="ml-2 rounded ll:ml-0"
                            type={inputTypeOne}
                            name="password"
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })}
                        />
                        <VisibilityIcon
                            onClick={() => setInputTypeOne(inputTypeOne === "password" ? "text" : "password")}
                            className="cursor-pointer absolute right-2 ll:top-6"
                        />
                    </label>
                    <label className="font-bold ll:flex ll:flex-col relative">
                        Confirmar contraseña:
                        <input
                            className="ml-2 rounded ll:ml-0"
                            type={inputTypeTwo}
                            name="confirmPassword"
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })}
                        />
                        <VisibilityIcon
                            onClick={() => setInputTypeTwo(inputTypeTwo === "password" ? "text" : "password")}
                            className="cursor-pointer absolute right-2 ll:top-6"
                        />
                    </label>
                    <label className="font-bold ll:flex ll:flex-col w-full">
                        Codigo de restaruración:
                        <input
                            className="ml-2 rounded ll:ml-0"
                            type="number"
                            name="code"
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })} />
                    </label>
                    {error && <b className="text-red-400">{error}</b>}
                    <div className="flex w-full justify-around ll:justify-between mt-5">
                        <button
                            className="buttonCancel w-24"
                            type="button"
                            onClick={() => { if (setResetPassword) setResetPassword(false) }}
                        >
                            Cancelar
                        </button>
                        <button className="buttonConfirm w-24">Enviar</button>
                    </div>
                </form>
            }
        </div>
    )
}