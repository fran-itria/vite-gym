/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hook/store"
import axios from "axios"
import moment from "moment"
import useLoaders from "../../../hook/Components/useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"
import Loader from "../../Loader"
import { onChange, onSubmit } from "./functions"

export default function ShiftsAdmin() {
    const { GymId } = useAppSelector(state => state.user)
    const [shifts, setShifts] = useState<{ id: string, day: string, hour: string }[]>([])
    const date = moment().format().split('T')[0]
    const { loader, setLoader } = useLoaders()
    const [inputs, setInputs] = useState<{ limit: number, time: number, open: string, close: string }>({ limit: 0, time: 0, open: '', close: '' })
    const [limitShift, setLimitShift] = useState<{ limit: number, time: string, open: string, close: string }>()
    const [stateButton, setStateButton] = useState<string>('')
    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.shift}s`)
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                const shifts: { id: string, day: string, hour: string }[] = response.data.Shifts
                const today = shifts.filter(shift => shift.day == date)
                setShifts(today)
                if (response.data.range.length > 0) {
                    const open = response.data.range[0].split('-')[0].replace(' ', '')
                    const close = response.data.range[response.data.range.length - 1].split('-')[1].replace(' ', '')
                    setLimitShift({
                        limit: response.data.limit,
                        time: response.data.time,
                        open,
                        close
                    })
                }
                setLoader(undefined)
            })
            .catch(error => {
                setLoader(undefined)
                window.alert(error.data.Error)
            })
    }, [])

    return (
        <>
            <p>Si desea limitar los turnos complete los siguientes campos: </p>
            <form onSubmit={(e) => onSubmit(e, inputs, GymId, setLoader, stateButton, setLimitShift)}>
                <label>
                    Limite por turnos:
                    <input type="number" name="limit" defaultValue={limitShift?.limit || ''} onChange={(e) => onChange(e, setInputs)}></input>
                </label>
                <label>
                    Tiempo por turno:
                    <input type="number" name="time" defaultValue={limitShift?.time || ''} onChange={(e) => onChange(e, setInputs)}></input>
                </label>
                <label>
                    Abre:
                    <input type="time" name="open" defaultValue={limitShift?.open || ''} onChange={(e) => onChange(e, setInputs)}></input>
                </label>
                <label>
                    Cierra:
                    <input type="time" name="close" defaultValue={limitShift?.close || ''} onChange={(e) => onChange(e, setInputs)}></input>
                </label>
                <button onClick={() => setStateButton('confirm')}>Confirmar</button>
                <button onClick={() => setStateButton('reset')}>Resetear</button>
            </form>
            {shifts?.length > 0 ?
                <>
                    <p>Turnos para el dia de hoy: {shifts.length}</p>
                    <table>
                        <thead>
                            <th>Hora</th>
                        </thead>
                        <tbody>
                            {shifts.map(shift =>
                                <tr>
                                    <td>{shift.hour.split('-')[0]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
                :
                <p>No tienes turnos para el día de hoy</p>
            }
            {loader ? <Loader text={loader} /> : <></>}
        </>
    )
}