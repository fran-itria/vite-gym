/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hook/store"
import axios from "axios"
import moment from "moment"
import { basicLoaders, specificLoaders } from "../../../const"
import { onChange, onSubmit } from "./functions"

export default function ShiftsAdmin({ setLoader }: { setLoader: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const { GymId } = useAppSelector(state => state.user)
    const [shifts, setShifts] = useState<{ id: string, day: string, hour: string }[]>([])
    const [shiftsSplit, setShiftsSplit] = useState<{
        morning: { id: string; day: string; hour: string; }[];
        afternoon: { id: string; day: string; hour: string; }[];
        night: { id: string; day: string; hour: string; }[]
    }>()
    const date = moment().format().split('T')[0]
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
                const shiftsSplit: {
                    morning: { id: string, day: string, hour: string }[],
                    afternoon: { id: string, day: string, hour: string }[]
                    night: { id: string, day: string, hour: string }[]
                } = {
                    morning: [],
                    afternoon: [],
                    night: []
                }
                shifts.map(shift => {
                    if (shift.day == date) {
                        if (Number(shift.hour.split(':')[0]) < 12) {
                            shiftsSplit.morning.push(shift)
                        } else if (Number(shift.hour.split(':')[0]) < 19) {
                            shiftsSplit.afternoon.push(shift)
                        } else {
                            shiftsSplit.night.push(shift)
                        }
                    }
                })
                setShiftsSplit(shiftsSplit)
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
        <div className="flex flex-col justify-center mt-10 xs:mt-5">
            <p className="mb-2.5">Si desea limitar los turnos complete los siguientes campos: </p>
            <div className="flex justify-center">
                <form
                    onSubmit={(e) => onSubmit(e, inputs, GymId, setLoader, stateButton, setLimitShift)}
                    className="grid grid-cols-2 gap-2.5 bg-cyan-900 p-4 rounded border"
                >
                    <label className="left flex justify-end">
                        Limite por turnos:
                        <input
                            type="number"
                            name="limit"
                            defaultValue={limitShift?.limit || ''}
                            onChange={(e) => onChange(e, setInputs)}
                            className="rounded w-16 ml-5"
                        ></input>
                    </label>
                    <label className="left flex justify-end">
                        Tiempo por turno:
                        <input
                            type="number"
                            name="time"
                            defaultValue={limitShift?.time || ''}
                            onChange={(e) => onChange(e, setInputs)}
                            className="rounded w-16 ml-5"
                        ></input>
                    </label>
                    <label className="flex justify-end">
                        Abre:
                        <input
                            type="time"
                            name="open"
                            defaultValue={limitShift?.open || ''}
                            onChange={(e) => onChange(e, setInputs)}
                            className="rounded ml-5 w-16"
                        ></input>
                    </label>
                    <label className="flex justify-end">
                        Cierra:
                        <input
                            type="time"
                            name="close"
                            defaultValue={limitShift?.close || ''}
                            onChange={(e) => onChange(e, setInputs)}
                            className="rounded w-16 ml-5"
                        ></input>
                    </label>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setStateButton('reset')}
                            className="w-28 bg-transparent text-red-500 border-solid border-red-500 hover:bg-red-950 hover:border-none"
                        >
                            Resetear
                        </button>
                    </div>
                    <button
                        onClick={() => setStateButton('confirm')}
                        className="w-28 bg-transparent text-green-500 border-2 border-solid border-green-500 hover:bg-green-950 hover:border-none"
                    >
                        Confirmar
                    </button>
                </form>
            </div >
            {shifts?.length > 0 ?
                // <>
                <section className="w-full flex justify-center mt-10 xs:mt-5">
                    <div className="flex flex-col items-start justify-between border p-4 h-40 rounded bg-gray-800 xs:p-2 xs:h-36">
                        <p>Turnos para el dia de hoy: <b>{shifts.length}</b></p>
                        <p>Mañana 🌤️:<b className="ml-1">{shiftsSplit?.morning.length}</b></p>
                        <p>Tarde 🌇: <b className="ml-1">{shiftsSplit?.afternoon.length}</b></p>
                        <p>Noche 🌙: <b className="ml-1">{shiftsSplit?.night.length}</b></p>
                    </div>
                </section>
                /* <table>
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
                </table> */
                // </>
                :
                <p>No tienes turnos para el día de hoy</p>
            }
        </div >
    )
}