import { NavLink } from "react-router-dom";
import style from './NavHome.module.css'

export default function NavHome() {
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                <NavLink
                    to={'/home/resumen'}
                    className={(isActive: boolean) => isActive ? style.active : style.pending}
                >
                    <li className={style.li}> Resumen </li>
                </NavLink>
                <NavLink
                    to={'/home/miSalud'}
                    className={(isActive: boolean) => isActive ? style.active : style.pending}
                >
                    <li className={style.li}> Mi salud </li>
                </NavLink>
                <NavLink
                    to={'/home/turnos'}
                    className={(isActive: boolean) => isActive ? style.active : style.pending}
                >
                    <li className={style.li}> Turnos </li>
                </NavLink>
            </ul>
        </nav>
    )
}