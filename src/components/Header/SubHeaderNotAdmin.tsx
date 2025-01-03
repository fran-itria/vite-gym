import { NavLink, useLocation } from "react-router-dom";

type props = {
    id: string | null
}

export default function SubHeaderNotAdmin({
    id
}: props) {

    const { pathname } = useLocation()
    const styleNavButton = 'w-32 ll:text-sm p-1.5'

    return (
        <nav>
            <ul className="
                flex
                justify-evenly
                w-full
                ll:flex-wrap
                ll:gap-2
                ll:mt-4"
            >
                <NavLink
                    to={`/home/${id}/resumen`}
                    className={pathname.includes("home")
                        ?
                        `border-2 border-gray-300 rounded bg-gray-300 ${styleNavButton}`
                        :
                        `button ${styleNavButton}`}>
                    <li>
                        Inicio
                    </li>
                </NavLink>
                <NavLink
                    to={`/calentamiento/${id}`}
                    className={({ isActive }) => isActive
                        ?
                        `border-2 border-gray-300 rounded bg-gray-300  ${styleNavButton}`
                        :
                        `button ${styleNavButton}`}
                >
                    <li>
                        Calentamiento
                    </li>
                </NavLink>
                <NavLink
                    to={`/rutina/${id}`}
                    className={({ isActive }) => isActive
                        ?
                        `border-2 border-gray-300 rounded bg-gray-300  ${styleNavButton}`
                        :
                        `button ${styleNavButton}`}
                >
                    <li>
                        Rutina
                    </li>
                </NavLink>
                <NavLink
                    to={`/suscripcion`}
                    className={({ isActive }) => isActive
                        ?
                        `border-2 border-gray-300 p-1.5 rounded bg-gray-300  ${styleNavButton}`
                        :
                        `button ${styleNavButton}`}
                >
                    <li>
                        Suscripción
                    </li>
                </NavLink>
            </ul>
        </nav>
    )
}
