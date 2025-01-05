import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hook/store";

export default function SubHeaderAdmin() {
    const { id } = useAppSelector(state => state.user)
    const styleNavButton = 'w-32 ll:text-sm p-1.5'

    return (
        <nav className="
            mt-3
            flex
            justify-evenly
            w-full
            ll:flex-wrap
            ll:gap-2
            ">
            <NavLink
                to={`/usuarios/${id}`}
                className={({ isActive }) => isActive
                    ?
                    `border-2 border-gray-300 rounded bg-gray-300 ${styleNavButton}`
                    :
                    `button ${styleNavButton}`
                }
            >
                Uuarios
            </NavLink>
            <NavLink
                to={`/suscripcion/${id}`}
                className={({ isActive }) => isActive
                    ?
                    `border-2 border-gray-300 rounded bg-gray-300  ${styleNavButton}`
                    :
                    `
                    button ${styleNavButton}`
                }
            >
                Suscripción
            </NavLink>
            <NavLink
                to={`/home/${id}/turnos`}
                className={({ isActive }) => isActive
                    ?
                    `border-2 border-gray-300 rounded bg-gray-300 ${styleNavButton}`
                    :
                    `button ${styleNavButton}`
                }
            >
                Turnos
            </NavLink>
            <NavLink
                to={`/calentamiento/${id}`}
                className={
                    ({ isActive }) => isActive
                        ?
                        `border-2 border-gray-300 rounded bg-gray-300  ${styleNavButton}`
                        :
                        `button ${styleNavButton}`
                }
            >
                Calentamiento
            </NavLink>
            <NavLink
                to={`/rutina/${id}`}
                className={({ isActive }) => isActive
                    ?
                    `border-2 border-gray-300 rounded bg-gray-300  ${styleNavButton}`
                    :
                    `button ${styleNavButton}`
                }
            >
                Rutina
            </NavLink>
        </nav>
    )
}