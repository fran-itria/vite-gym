import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hook/store";

export default function NavHome() {
  const { id } = useAppSelector(state => state.user)
  return (
    <nav className="w-full flex justify-center">
      <ul className="
          flex 
          justify-evenly 
          items-center 
          w-1/2
          ll:w-full 
          bg-cyan-800 
          rounded-full
          ">
        <li>
          <NavLink
            to={`/home/${id}/resumen`}
            className={({ isActive }) =>
              isActive ? 'text-gray-100' : 'hover:text-gray-100'
            }
          >
            Resumen
          </NavLink>
        </li>
        <div className='border-2 border-black h-full'></div>
        <li>
          <NavLink
            to={`/home/${id}/miSalud`}
            className={({ isActive }) =>
              isActive ? 'font-bold text-gray-100' : 'hover:text-gray-100'
            }
          >
            Mi salud
          </NavLink>
        </li>
        <div className='border-2 border-black h-full'></div>
        <li>
          <NavLink
            to={`/home/${id}/turnos`}
            className={({ isActive }) =>
              isActive ? 'font-bold text-gray-100' : 'hover:text-gray-100'
            }
          >
            Turnos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
