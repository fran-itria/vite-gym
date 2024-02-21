import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from './Header.module.css'
import { useAppSelector } from "../../hook/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../services/logout/logout";

export default function Header() {
    const { pathname } = useLocation()
    const { GymId, name, surname, id } = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const [gymName, setGymName] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`).then(response => {
            setGymName(response.data)
        })
    }, [GymId])
    return (
        <>
            <header className={style.header}>
                <h1 className={style.gymName}>{gymName}</h1>
                {/* <img alt="Foto" className={style.perfil} /> */}
                <div className={style.perfil}>
                    <button onClick={() => setMenu(!menu)} className={style.photo}>{name && surname ? name[0] + surname[0] : 'P'}</button>
                    {menu ?
                        <div className={style.menu}>
                            <button>Perfil</button>
                            <button onClick={() => logout(id, navigate)}>Cerrar sesión</button>
                        </div>
                        :
                        <></>
                    }
                </div>
            </header>
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
                    <NavLink to={`/suscripcion/${id}`} className={({ isActive }) => isActive ? style.active : ''}>
                        <li className={style.suscripcion}>
                            Suscripción
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </>
    )
}