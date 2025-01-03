import { useAppSelector } from "../../hook/store"

export default function Summary() {
    const user = useAppSelector(state => state.user)
    return (
        <div className="h-4/6 justify-evenly flex flex-col">
            <b> Nombre: {user.name}</b>
            <b> Mail:  {user.email}</b>
            <b> Edad: {user.age}</b>
            <b> Dni: {user.dni}</b>
            <b> Numero de telefono: {user.phone}</b>
            <b> Contacto de emergencia:  {user.contactEmergency}</b>
            <b> Calentamientos: {user.WarmUps.length}</b>
            <b> Rutinas: {user.Routines.length}</b>
            <b> Suscripción: {user.pay ? '✅' : '❌'}</b>
        </div>
    )
}