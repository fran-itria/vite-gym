import { NavigateFunction } from "react-router-dom"
import deleteImage from "../../services/deleteImage"
import { logout } from "../../services/logout/logout"
import { getGyms } from "./functions"

type props = {
    setResetPassword: (value: React.SetStateAction<boolean>) => void
    setChangeGym: (value: React.SetStateAction<boolean>) => void
    setImage: (value: React.SetStateAction<boolean>) => void
    setMenu: (value: React.SetStateAction<boolean>) => void
    setLoader: React.Dispatch<React.SetStateAction<string | undefined>>
    setGyms: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
    }[]>>
    updatePhotoUser: (photo: string) => void
    navigate: NavigateFunction
    photo: string | null
    menu: boolean
    Gym: {
        name: string;
    } | null
    id: string | null
    name: string | null
    surname: string | null
}

export default function SubHeader({
    menu,
    photo,
    Gym,
    id,
    name,
    surname,
    navigate,
    setChangeGym,
    setImage,
    setResetPassword,
    setMenu,
    setLoader,
    setGyms,
    updatePhotoUser
}: props) {

    return (
        <header className="flex justify-between items-center w-full h-12 mt-2.5">
            <h1 className="text-gray-800 dark:text-white font-mono font-normal text-3xl ml-5 xs:text-2xl">{Gym?.name}</h1>
            <div className="flex flex-col justify-center items-center">
                {photo && photo.length > 0 ?
                    <img
                        alt="Foto de perfil"
                        className="w-10 h-10 mr-6 rounded-full text-white bg-gray-900 dark:bg-cyan-800"
                        src={photo}
                        onClick={() => setMenu(prev => !prev)}
                    />
                    :
                    <button
                        className="w-10 h-10 mr-6 rounded-full text-white bg-gray-900 dark:bg-cyan-800"
                        onClick={() => setMenu(prev => !prev)}> {name && surname ? name[0] + surname[0] : 'P'}
                    </button>
                }
                {menu &&
                    <div className="
                            flex 
                            flex-col
                            justify-between
                            absolute 
                            top-16
                            right-6 
                            h-48
                            rounded
                            p-2
                            bg-gray-900
                            dark:bg-gray-800
                            xs:h-52
                            xs:w-24
                            "
                    >
                        <button
                            className="xs:h-9 xs:text-xs text-center xs:flex xs:justify-center xs:items-center"
                            onClick={() => {
                                if (!photo) setImage(prev => !prev)
                                else deleteImage(setLoader, updatePhotoUser, id, setMenu)
                            }}>
                            {!photo ? <>Cargar foto</> : <>Borrar foto</>}
                        </button>
                        <button
                            className="xs:h-9 xs:text-xs xs:text-center xs:flex xs:justify-center xs:items-center"
                            onClick={() => {
                                getGyms(setGyms)
                                setChangeGym(prev => !prev)
                            }}>
                            Cambiar de gym
                        </button>
                        <button
                            className="xs:h-9 xs:text-xs xs:text-center xs:flex xs:justify-center xs:items-center"
                            onClick={() => setResetPassword(prev => !prev)}>
                            Cambiar contraseña
                        </button>
                        <button
                            className="xs:h-9 xs:text-xs xs:text-center xs:flex xs:justify-center xs:items-center"
                            onClick={() => logout(id, navigate, setLoader)}>
                            Cerrar sesión
                        </button>
                    </div>
                }
            </div>
        </header>
    )
}