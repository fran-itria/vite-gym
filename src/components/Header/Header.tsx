import { NavLink, useLocation } from "react-router-dom";
import style from './Header.module.css'
import { useAppSelector } from "../../hook/store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
    const { pathname } = useLocation()
    const { id } = useAppSelector(state => state.user)
    const { GymId, name, surname } = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const [gymName, setGymName] = useState<string>('')

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
                            <p>Perfil</p>
                            <p>Cerrar sesión</p>
                        </div>
                        :
                        <></>
                    }
                </div>
            </header>
            <nav>
                <ul className={style.list}>
                    <NavLink to={`/home/resumen`} className={pathname.includes("home") ? style.active : ''}>
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
        </>
    )
}