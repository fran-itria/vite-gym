import { useAppSelector } from "../../hook/store"

export default function Resume() {
    const user = useAppSelector(state => state.user)
    return (
        <div>
            <p> <b>Nombre: </b> {user.name}</p>
            <p> <b>Mail: </b> {user.email}</p>
            <p> <b>Edad: </b> {user.age}</p>
            <p> <b>Dni: </b> {user.dni}</p>
            <p> <b>Numero de telefono: </b> {user.phone}</p>
            <p> <b>Contacto de emergencia: </b> {user.contactEmergency}</p>
            <p> <b>Calentamientos: </b> {user.WarmUps.length}</p>
            <p> <b>Rutinas: </b> {user.Routines.length}</p>
            <p> <b>Suscripción: </b> {user.pay ? '✅' : '❌'}</p>
        </div>
    )
}