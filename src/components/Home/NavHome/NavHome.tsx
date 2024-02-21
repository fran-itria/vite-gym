import { NavLink } from "react-router-dom";
import style from "./NavHome.module.css";
import { useAppSelector } from "../../../hook/store";

export default function NavHome() {
  const { id } = useAppSelector(state => state.user)
  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li>
          <NavLink
            to={`/home/${id}/resumen`}
            className={({ isActive }) =>
              isActive ? style.active : style.pending
            }
          >
            Resumen
          </NavLink>
        </li>
        <div className={style.line}></div>
        <li>
          <NavLink
            to={`/home/${id}/miSalud`}
            className={({ isActive }) =>
              isActive ? style.active : style.pending
            }
          >
            Mi salud
          </NavLink>
        </li>
        <div className={style.line}></div>
        <li>
          <NavLink
            to={`/home/${id}/turnos`}
            className={({ isActive }) =>
              isActive ? style.active : style.pending
            }
          >
            Turnos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
