import { NavLink } from "react-router-dom";
import style from "./NavHome.module.css";

export default function NavHome() {
  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li>
          <NavLink
            to={"/home/resumen"}
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
            to={"/home/miSalud"}
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
            to={"/home/turnos"}
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
