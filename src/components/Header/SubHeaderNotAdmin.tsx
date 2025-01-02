import { NavLink, useLocation } from "react-router-dom";

type props = {
    id: string | null
}

export default function SubHeaderNotAdmin({
    id
}: props) {

    const { pathname } = useLocation()

    return (
        <nav>
            <ul>
                <NavLink to={`/home/${id}/resumen`} className={pathname.includes("home") ? '' : ''}>
                    <li>
                        Inicio
                    </li>
                </NavLink>
                <NavLink to={`/calentamiento/${id}`} className={({ isActive }) => isActive ? '' : ''}>
                    <li>
                        Calentamiento
                    </li>
                </NavLink>
                <NavLink to={`/rutina/${id}`} className={({ isActive }) => isActive ? '' : ''}>
                    <li>
                        Rutina
                    </li>
                </NavLink>
                <NavLink to={`/suscripcion`} className={({ isActive }) => isActive ? '' : ''}>
                    <li>
                        Suscripción
                    </li>
                </NavLink>
            </ul>
        </nav>
    )
}
