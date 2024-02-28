import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from './Header.module.css'
import { useAppSelector } from "../../hook/store";
import { useState } from "react";
import { logout } from "../../services/logout/logout";
import HomeAdmin from "../Admin/Home/HomeAdmin";

export default function Header() {
    const { pathname } = useLocation()
    const { name, surname, id, admin, Gym} = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const navigate = useNavigate()

    return (
        <>
            <header className={style.header}>
                <h1 className={style.gymName}>{Gym?.name}</h1>
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
                        <NavLink to={`/suscripcion/${id}`} className={({ isActive }) => isActive ? style.active : ''}>
                            <li className={style.suscripcion}>
                                Suscripción
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                :
                <HomeAdmin />
            }
        </>
    )
}