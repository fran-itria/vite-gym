/* eslint-disable react-hooks/exhaustive-deps */
import useCalendar from "../../../hook/Components/Calendar/useCalendar";
import Month from "./Month/Month";
import style from './Calendar.module.css'
import Week from "./Week/Week";
import Days from "./Days/Days";
import { useUserActions } from "../../../hook/useUserActions";
import { useAppSelector } from "../../../hook/store";
import { confirm } from "../../../services/calendar/confirm";
import { SetLoader } from "../../../types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Calendar({ setLoader, range, limit }: { setLoader: SetLoader, range: string[] | undefined, limit: number | null }) {
    const { day, setDay, month, setMonth, actualYear, setActualYear, selectDay, setSelectDay } = useCalendar()
    const { updateShiftsUser } = useUserActions()
    const { id, GymId, Shifts } = useAppSelector(state => state.user)
    const [hours, setHours] = useState<{ day: string, hour: string }[]>()
    // const [defaultTime, setDefaultTime] = useState<string>()

    useEffect(() => {
        // console.log(day)
        async function getShiftsHours() {
            const dayParam = `${actualYear}-${month < 10 ? `0${month + 1}` : month}-${day < 10 ? `0${day}` : day}`
            const hours = await axios.get(`/shift/${GymId}/${dayParam}`)
            setHours(hours.data)
        }
        getShiftsHours()
    }, [day, Shifts])
    useEffect(() => console.log(hours), [hours])
    return (
        <div className={style.complete}>
            <div className={style.month}>
                <Month month={month} setMonth={setMonth} setActualYear={setActualYear} />
            </div>
            <div className={style.calendar}>
                <Week />
                <Days month={month} day={day} setDay={setDay} actualYear={actualYear} />
            </div>
            <div className={style.confirm}>
                {/* <label>
                    Seleccionar hora:
                    <input type="time" value={defaultTime} onChange={(e) => {
                        setDefaultTime(e.target.value)
                        setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour: e.target.value })
                    }
                    }></input>
                </label> */}
                <div>
                    {range ? range.map((hour, index) => {
                        if (hours && limit && hours?.filter(h => h.hour.split(':')[0] == hour.split(':')[0]).length < limit) {
                            return (
                                <button key={index} onClick={() => {
                                    setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour })
                                }}>{hour}</button>
                            )
                        }
                    }
                    )
                        : <></>
                    }
                </div>
                <button className={style.button} onClick={() => {
                    confirm({ GymId, id, selectDay, setLoader, updateShiftsUser })
                    // setDefaultTime('')
                }
                }>Confirmar</button>
            </div>
        </div>
    )
}