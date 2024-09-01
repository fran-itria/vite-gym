/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import style from './Header.module.css'
import { logout } from "../../services/logout/logout";
import HomeAdmin from "../Admin/Home/HomeAdmin";
import Loader from "../Loader";
import uploadImage from "../../services/firebase/uploadImage";
import deleteImage from "../../services/deleteImage";
import { useHeader } from "./useHeader";
import { getGyms, change } from "./functions";
import { basicLoaders } from "../../const";
import ResetPassword from "../ResetPassword/ResetPassword";

export default function Header() {
    const {
        Gym,
        admin,
        cahngeGym,
        file,
        gyms,
        id,
        image,
        loader,
        menu,
        name,
        pathname,
        photo,
        surname,
        valueGym,
        navigate,
        setChangeGym,
        setFile,
        setGyms,
        setImage,
        setLoader,
        setMenu,
        setValueGym,
        updatePhotoUser,
        reset,
        setResetPassword
    } = useHeader()

    return (
        <>
            <header className="flex justify-between items-center w-screen h-12 mt-2.5">
                <h1 className="text-gray-800 dark:text-white font-mono font-normal text-3xl ml-5 max-[425px]:text-2xl">{Gym?.name}</h1>
                <div className="flex flex-col justify-center items-center">
                    {photo && photo.length > 0 ?
                        <img alt="Foto de perfil" className={style.photoImg} src={photo} onClick={() => setMenu(prev => !prev)} />
                        :
                        <button className="w-10 h-10 mr-6 rounded-full text-white bg-gray-900 dark:bg-cyan-800" onClick={() => setMenu(prev => !prev)}> {name && surname ? name[0] + surname[0] : 'P'} </button>
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
                            max-[425px]:h-52
                            max-[425px]:w-24
                            "
                        >
                            <button
                                className="max-[425px]:h-9 max-[425px]:text-xs text-center max-[425px]:flex max-[425px]:justify-center max-[425px]:items-center"
                                onClick={() => {
                                    if (!photo) setImage(prev => !prev)
                                    else deleteImage(setLoader, updatePhotoUser, id, setMenu)
                                }}>
                                {!photo ? <>Cargar foto</> : <>Borrar foto</>}
                            </button>
                            <button
                                className="max-[425px]:h-9 max-[425px]:text-xs max-[425px]:text-center max-[425px]:flex max-[425px]:justify-center max-[425px]:items-center"
                                onClick={() => {
                                    getGyms(setGyms)
                                    setChangeGym(prev => !prev)
                                }}>
                                Cambiar de gym
                            </button>
                            <button
                                className="max-[425px]:h-9 max-[425px]:text-xs max-[425px]:text-center max-[425px]:flex max-[425px]:justify-center max-[425px]:items-center"
                                onClick={() => setResetPassword(prev => !prev)}>
                                Cambiar contraseña
                            </button>
                            <button
                                className="max-[425px]:h-9 max-[425px]:text-xs max-[425px]:text-center max-[425px]:flex max-[425px]:justify-center max-[425px]:items-center"
                                onClick={() => logout(id, navigate, setLoader)}>
                                Cerrar sesión
                            </button>
                        </div>
                    }
                </div>
            </header>
            {!admin ?
                <nav>
                    <ul className={style.list}>
                        <NavLink to={`/home/${id}/resumen`} className={pathname.includes("home") ? style.active : ''}>
                            <li className={style.inicio}>
                                Inicio
                            </li>
                        </NavLink>
                        <NavLink to={`/calentamiento/${id}`} className={({ isActive }) => isActive ? style.active : ''}>
                            <li className={style.calentamiento}>
                                Calentamiento
                            </li>
                        </NavLink>
                        <NavLink to={`/rutina/${id}`} className={({ isActive }) => isActive ? style.active : ''}>
                            <li className={style.rutina}>
                                Rutina
                            </li>
                        </NavLink>
                        <NavLink to={`/suscripcion`} className={({ isActive }) => isActive ? style.active : ''}>
                            <li className={style.suscripcion}>
                                Suscripción
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                :
                <HomeAdmin />
            }
            {image ?
                <div style={{ position: 'absolute', top: '50%', right: '50%' }}>
                    <input type="file" onChange={(e) => { setFile(e.target.files ? e.target.files[0] : undefined) }}></input>
                    <button onClick={() => uploadImage({ nameFile: `${name} ${surname}`, file, id, updatePhotoUser, setLoader, setImage, setMenu })}>Subir</button>
                </div >
                :
                <></>
            }
            {cahngeGym && gyms.length > 0 ?
                <div>
                    <select onChange={(e) => setValueGym(e.target.value)}>
                        <option value=''>Selecciona un gym</option>
                        {gyms.map((gym: { id: string, name: string }) => <option key={gym.id} value={gym.id}>{gym.name}</option>)}
                    </select>
                    <button onClick={() => {
                        setLoader(basicLoaders.changeGym)
                        change(id, valueGym, navigate)
                    }}>Cambiar</button>
                </div>
                :
                <></>
            }
            {reset ? <ResetPassword setResetPassword={setResetPassword} /> : <></>}
            {loader ? <Loader text={loader} /> : <></>}
        </>
    )
}