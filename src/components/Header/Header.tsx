/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from './Header.module.css'
import { useAppSelector } from "../../hook/store";
import { useState } from "react";
import { logout } from "../../services/logout/logout";
import HomeAdmin from "../Admin/Home/HomeAdmin";
import useLoaders from "../../hook/Components/useLoaders";
import Loader from "../Loader";
import uploadImage from "../../services/firebase/uploadImage";
import { useUserActions } from "../../hook/useUserActions";
import deleteImage from "../../services/deleteImage";

export default function Header() {
    const { pathname } = useLocation()
    const { name, surname, id, admin, Gym, photo } = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const navigate = useNavigate()
    const { loader, setLoader } = useLoaders()
    const [image, setImage] = useState(false)
    const [file, setFile] = useState<any>()
    const { updatePhotoUser } = useUserActions()

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
                            <button>Perfil</button>
                            <button onClick={() => logout(id, navigate, setLoader)}>Cerrar sesión</button>
                            <button onClick={() => setImage(prev => !prev)}>Subir imagen</button>
                            <button onClick={() => deleteImage(setLoader, updatePhotoUser, id, setMenu)}>Borrar foto</button>
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
        </>
    )
}