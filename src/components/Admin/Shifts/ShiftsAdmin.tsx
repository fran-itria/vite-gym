/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hook/store"
import axios from "axios"
import moment from "moment"
import useLoaders from "../../../hook/Components/useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"
import Loader from "../../Loader"

export default function ShiftsAdmin() {
    const { GymId } = useAppSelector(state => state.user)
    const [shifts, setShifts] = useState<{ id: string, day: string, hour: string }[]>([])
    const date = moment().format().split('T')[0]
    const { loader, setLoader } = useLoaders()

    useEffect(() => {
        setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.shift}s` })
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                const shifts: { id: string, day: string, hour: string }[] = response.data.Shifts
                const today = shifts.filter(shift => shift.day == date)
                setShifts(today)
                setLoader({ state: false })
            })
            .catch(error => window.alert(error.data.Error))
    }, [])

    return (
        <>
            {shifts?.length > 0 ?
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
            }
            {loader && loader.reason ? <Loader text={loader.reason} /> : <></>}
        </>
    )
}