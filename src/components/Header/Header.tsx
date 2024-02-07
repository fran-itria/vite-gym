import { NavLink, useLocation } from "react-router-dom";
import style from './Header.module.css'
import { useAppSelector } from "../../hook/store";

export default function Header() {
    const { pathname } = useLocation()
    const { id } = useAppSelector(state => state.user)
    return (
        <>
            <header className={style.header}>
                <h1 className={style.gymName}>Nombre del gym</h1>
                {/* <img alt="Foto" className={style.perfil} /> */}
                <div className={style.perfil}>P</div>
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