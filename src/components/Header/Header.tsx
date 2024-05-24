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
        updateGymUser,
        updatePhotoUser
    } = useHeader()

    return (
        <>
            <header className={style.header}>
                <h1 className={style.gymName}>{Gym?.name}</h1>
                <div className={style.perfil}>
                    {photo && photo.length > 0 ?
                        <img alt="Foto de perfil" className={style.photoImg} src={photo} onClick={() => setMenu(prev => !prev)} />
                        :
                        <button className={style.photoText} onClick={() => setMenu(prev => !prev)}> {name && surname ? name[0] + surname[0] : 'P'} </button>
                    }
                    {menu ?
                        <div className={style.menu}>
                            <button
                                onClick={() => {
                                    if (!photo) setImage(prev => !prev)
                                    else deleteImage(setLoader, updatePhotoUser, id, setMenu)
                                }}>
                                {!photo ? <>Cargar foto</> : <>Borrar foto</>}
                            </button>
                            <button onClick={() => {
                                getGyms(setGyms)
                                setChangeGym(prev => !prev)
                            }}> Cambiar de gym </button>
                            <button onClick={() => logout(id, navigate, setLoader)}>Cerrar sesión</button>
                        </div>
                        :
                        <></>
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
            {loader && loader.reason ? <Loader text={loader.reason} /> : <></>}
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
                        setLoader({ state: true, reason: 'Cambiando de gym' })
                        change(id, valueGym, updateGymUser)
                        setChangeGym(false)
                        setLoader({ state: false })
                    }}>Cambiar</button>
                </div>
                :
                <></>
            }
        </>
    )
}