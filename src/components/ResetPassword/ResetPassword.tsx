import searchUser from "./services/searchUser"
import cahngePassword from "./services/reset"
import useResetPassword from "./useResetPassword"
import Loader from "../Loader"

export default function ResetPassword({ setResetPassword }: { setResetPassword?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {
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
    } = useResetPassword()
    return (
        <>
            {loader ? <Loader text={loader} /> : <></>}
            <h3>Recuperar contraseña</h3>
            {!reset ?
                <div>
                    <p>
                        Ingresa tu número de documento para buscar tu cuenta.
                    </p>
                    <form onSubmit={(e) => searchUser(e, dni, setReset, setUser, setLoader)}>
                        <input placeholder="DNI" onChange={(e) => setDni(e.target.value)}></input>
                        <button>Buscar</button>
                        <button type="button" onClick={() => { if (setResetPassword) setResetPassword(false) }}>Cancelar</button>
                    </form>
                </div>
                :
                <form onSubmit={(e) => cahngePassword(e, newPassword, user, setError, navigate, setLoader)}>
                    <label>
                        Nueva contraseña:
                        <input type="password" name="password" onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })} />
                    </label>
                    <label>
                        Confirmar contraseña:
                        <input type="password" name="confirmPassword" onChange={(e) => setNewPassword(state => { return { ...state, [e.target.name]: e.target.value } })} />
                    </label>
                    <button>Enviar</button>
                    {error ? <p>{error}</p> : <></>}
                </form>
            }
        </>
    )
}