import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hook/store";
import style from './HomeAdmin.module.css'
export default function HomeAdmin() {
    const { id } = useAppSelector(state => state.user)
    return (
        <div className={style.container}>
            <nav className={style.nav}>
                <NavLink to={`/usuarios/${id}`}>
                    Uuarios
                </NavLink>
                <NavLink to={`/home/${id}/turnos`} >
                    Turnos
                </NavLink>
                <NavLink to={`/rutina/${id}`}>
                    Rutina
                </NavLink>
                <NavLink to={`/sucrpición/${id}`}>
                    Suscripción
                </NavLink>
            </nav>
        </div>
    )
}