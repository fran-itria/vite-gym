import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hook/store"
import axios from "axios"
import moment from "moment"

export default function ShiftsAdmin(){
    const { GymId } = useAppSelector(state => state.user)
    const [shifts, setShifts] = useState<{id: string, day: string, hour: string}[]>([])
    const date = moment().format().split('T')[0]

    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`)
        .then(response => {
            const shifts: {id: string, day: string, hour: string}[] = response.data.Shifts
            const today = shifts.filter(shift => shift.day == date)
            setShifts(today)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        shifts?.length > 0 ?
            <>
                <p>Turnos para el dia de hoy: {shifts.length}</p>
                <table>
                    <thead>
                        <th>Hora</th>
                    </thead>
                    <tbody>
                        <tr>
                            {shifts.map(shift => <td>{shift.hour}</td>)}
                        </tr>
                    </tbody>
                </table>
            </>
            :
            <p>No tienes turnos para el día de hoy</p>
    )
}