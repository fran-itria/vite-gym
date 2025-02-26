import searchUser from "./services/searchUser"
import cahngePassword from "./services/reset"
import useResetPassword from "./useResetPassword"
import Loader from "../Loader"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";

export default function ResetPassword({ setResetPassword, fromForm }: { setResetPassword?: React.Dispatch<React.SetStateAction<boolean>>, fromForm?: boolean }) {
    const {
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
    } = useResetPassword()
    const [inputTypeOne, setInputTypeOne] = useState("password")
    const [inputTypeTwo, setInputTypeTwo] = useState("password")

    return (
        <div className="background flex flex-col rounded p-4">
            {loader ? <Loader text={loader} /> : <></>}
            <b className="mb-5 text-gray-900 dark:text-white w-full flex justify-center">Recuperar contraseña</b>
            {!reset ?
                <div>
                    <b className="text-gray-900 dark:text-white">
                        Ingrese el correo electronico asociado a su cuenta
                    </b>
                    <form
                        className="flex flex-col items-center mt-3"
                        onSubmit={(e) => searchUser(e, email, emailInput, setReset, setLoader, setIdUser, fromForm)}
                    >
                        <input
                            autoFocus
                            className="w-50"
                            placeholder="Correo electronico"
                            required
                            onChange={(e) => setEmailInput(e.target.value)}>
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
                    className="flex flex-col items-center ll:items-start justify-between h-72 w-64 ll:w-auto"
                    onSubmit={(e) => cahngePassword({ e, newPassword, id: idUser, setError, navigate, setLoader, setResetPassword })}>
                    <label className="font-bold flex flex-col relative">
                        Nueva contraseña:
                        <input
                            className="ml-2 rounded ml-0"
                            type={inputTypeOne}
                            name="password"
                            required
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })}
                        />
                        <VisibilityIcon
                            onClick={() => setInputTypeOne(inputTypeOne === "password" ? "text" : "password")}
                            className="cursor-pointer absolute right-2 top-6"
                        />
                    </label>
                    <label className="font-bold flex flex-col relative">
                        Confirmar contraseña:
                        <input
                            className="ml-2 rounded ml-0"
                            type={inputTypeTwo}
                            name="confirmPassword"
                            required
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })}
                        />
                        <VisibilityIcon
                            onClick={() => setInputTypeTwo(inputTypeTwo === "password" ? "text" : "password")}
                            className="cursor-pointer absolute right-2 top-6"
                        />
                    </label>
                    <label className="font-bold flex flex-col">
                        Codigo de restaruración:
                        <input
                            className="ml-2 rounded ml-0"
                            type="number"
                            name="code"
                            required
                            onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })} />
                    </label>
                    {error && <b className="text-red-400">{error}</b>}
                    <div className="flex w-full justify-around ll:justify-between">
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