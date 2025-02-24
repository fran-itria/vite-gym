/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hook/store"
import axios from "axios"
import moment from "moment"
import { basicLoaders, specificLoaders } from "../../../const"
import { onChange, onSubmit } from "./functions"
import sweetAlert from "../../../services/swartAlert"
import { Table, TableContainer, TableHead, TableBody, TableRow } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme"

export default function ShiftsAdmin({ setLoader }: { setLoader: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const { GymId } = useAppSelector(state => state.user)
    const [shifts, setShifts] = useState<{ id: string, day: string, hour: string, User: { name: string, surname: string } }[]>([])
    const date = moment().format().split('T')[0]
    const [inputs, setInputs] = useState<{ limit: number, time: number, open: string, close: string }>({ limit: 0, time: 0, open: '', close: '' })
    const [limitShift, setLimitShift] = useState<{ limit: number, time: string, open: string, close: string }>()
    const [stateButton, setStateButton] = useState<string>('')
    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.shift}s`)
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                const shifts: { id: string, day: string, hour: string, User: { name: string, surname: string } }[] = response.data.Shifts
                const today = shifts.filter(shift => shift.day >= date)
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
                sweetAlert(error.data.Error)
            })
    }, [])

    return (
        <div className="h-full p-4 flex flex-col justify-start items-center">
            <b className="mt-5 mb-2.5 ll:mb-2 ll:w-96">Si desea limitar los turnos complete los siguientes campos: </b>
            <div className="flex justify-center w-full items-center h-fit ll:h-52">
                <form
                    onSubmit={(e) => onSubmit(e, inputs, GymId, setLoader, stateButton, setLimitShift)}
                    className="
                    grid 
                    grid-cols-2 
                    gap-2.5
                    border-2
                    bg-gray-300 
                    border-gray-700 
                    dark:bg-cyan-950
                    dark:border-cyan-700 
                    p-4 
                    rounded 
                    border 
                    w-96 
                    ll:flex
                    ll:flex-col
                    ll:items-center
                    "
                >
                    <div className="ll:items-start col-span-2 flex flex-col justify-center items-center">
                        <div className="flex flex-col w-fit mb-2 text-start ll:flex-row">
                            <label className="font-bold text-gray-800 dark:text-white">
                                Limite de turnos:
                            </label>
                            <input
                                type="number"
                                name="limit"
                                defaultValue={limitShift?.limit || ''}
                                onChange={(e) => onChange(e, setInputs)}
                                className="rounded p-1 w-16 h-6 ll:ml-3 text-gray-700 dark:text-white"
                                required
                            ></input>
                        </div>
                        <div className="flex flex-col mb-2 w-fit text-start ll:flex-row">
                            <label className="font-bold text-gray-800 dark:text-white">
                                Tiempo de turno:
                            </label>
                            <input
                                type="number"
                                name="time"
                                defaultValue={limitShift?.time || ''}
                                onChange={(e) => onChange(e, setInputs)}
                                className="rounded p-1 w-16 h-6 ll:ml-3 text-gray-700 dark:text-white"
                                required
                            ></input>
                        </div>
                        <div className="flex flex-col mb-2 w-fit mr-12 ll:flex-row">
                            <label className="font-bold text-gray-800 dark:text-white">
                                Apertura:
                            </label>
                            <input
                                type="time"
                                name="open"
                                defaultValue={limitShift?.open || ''}
                                onChange={(e) => onChange(e, setInputs)}
                                className="rounded w-20 h-6 ll:ml-3 text-gray-700 dark:text-white"
                                required
                            ></input>
                        </div>
                        <div className="flex flex-col text-start w-fit mr-12 ll:flex-row">
                            <label className="font-bold text-gray-800 dark:text-white">
                                Cierre:
                            </label>
                            <input
                                type="time"
                                name="close"
                                defaultValue={limitShift?.close || ''}
                                onChange={(e) => onChange(e, setInputs)}
                                className="rounded w-20 h-6 ll:ml-3 text-gray-700 dark:text-white"
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-around ll:justify-center">
                        <button
                            onClick={() => setStateButton('reset')}
                            className={`${limitShift ? 'pointer-events-auto' : "opacity-50 pointer-events-none"}
                            ll:ml-6 
                            l:ml-4
                            w-28
                            l:w-20
                            l:h-7
                            l:text-s
                            l:text-center
                            l:p-0
                            ll:w-20
                            ll:h-8
                            ll:text-center
                            ll:p-0
                            ll:mr-4
                            buttonCancel 
                            `}
                        >
                            Resetear
                        </button>
                        <button
                            onClick={() => setStateButton('confirm')}
                            className="
                            ll:mr-4
                            l:mr-14 
                            w-28
                            l:w-20
                            l:h-7
                            l:text-s
                            l:text-center
                            l:p-0 
                            ll:w-24
                            ll:h-8
                            ll:text-center
                            ll:p-0
                            ll:mr-4
                            buttonConfirm 
                            "
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div >
            {shifts?.length > 0 ?
                <section className="w-full flex justify-center mt-10 l:mt-2 ll:mt-10">
                    <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
                        <Table aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center"><b>Día</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Hora</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Nombre</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Apellido</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shifts.map(shift => {
                                    const day = shift.day.split('-')
                                    return (
                                        <StyledTableRow>
                                            <StyledTableCell align="center"><b>{`${day[2]} - ${day[1]}`}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{shift.hour.split('-')[0]}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{shift.User.name}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{shift.User.surname}</b></StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* 
                        <b className="text-gray-700 dark:text-white">Turnos para el dia de hoy: <b>{shifts.length}</b></b>
                        <b className="text-gray-700 dark:text-white">Mañana 🌤️:<b className="ml-1">{shiftsSplit?.morning.length}</b></b>
                        <b className="text-gray-700 dark:text-white">Tarde 🌇: <b className="ml-1">{shiftsSplit?.afternoon.length}</b></b>
                        <b className="text-gray-700 dark:text-white">Noche 🌙: <b className="ml-1">{shiftsSplit?.night.length}</b></b> 
                    */}
                </section>
                :
                <b className="mt-2">No tienes turnos para el día de hoy</b>
            }
        </div >
    )
}