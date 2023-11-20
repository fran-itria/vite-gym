import { NavLink } from "react-router-dom";
import style from './Header.module.css'

export default function Header() {
    const id = 'idDelUsuario'
    return (
        <>
            <header className={style.header}>
                <h1 className={style.gymName}>Nombre del gym</h1>
                {/* <img alt="Foto" className={style.perfil} /> */}
                <div className={style.perfil}>P</div>
            </header>
            <nav>
                <ul className={style.list}>
                    <li className={style.calentamiento}><NavLink to={`/calentamiento/${id}`}> Calentamiento </NavLink></li>
                    <li className={style.rutina}><NavLink to={`/rutina/${id}`}> Rutina </NavLink></li>
                    <li className={style.suscripcion}><NavLink to='/suscripcion'> Suscripción </NavLink></li>
                </ul>
            </nav>
        </>
    )
}