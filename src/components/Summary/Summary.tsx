import { useAppSelector } from "../../hook/store"

export default function Summary() {
    const user = useAppSelector(state => state.user)
    return (
        <div className="h-4/6 justify-evenly flex flex-col">
            <b> <b className="text-black dark:text-white">Nombre:</b> {user.name}</b>
            <b> <b className="text-black dark:text-white">Mail:</b>  {user.email}</b>
            <b> <b className="text-black dark:text-white">Edad:</b> {user.age}</b>
            <b> <b className="text-black dark:text-white">Dni:</b> {user.dni}</b>
            <b> <b className="text-black dark:text-white">Numero de telefono:</b> {user.phone}</b>
            <b> <b className="text-black dark:text-white">Contacto de emergencia:</b>  {user.contactEmergency}</b>
            <b> <b className="text-black dark:text-white">Calentamientos:</b> {user.WarmUps.length}</b>
            <b> <b className="text-black dark:text-white">Rutinas:</b> {user.Routines.length}</b>
            <b> <b className="text-black dark:text-white">Suscripción:</b> {user.pay ? '✅' : '❌'}</b>
        </div>
    )
}