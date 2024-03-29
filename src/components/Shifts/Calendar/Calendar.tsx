import useCalendar from "../../../hook/Components/Calendar/useCalendar";
import Month from "./Month/Month";
import style from './Calendar.module.css'
import Week from "./Week/Week";
import Days from "./Days/Days";
import { useUserActions } from "../../../hook/useUserActions";
import { useAppSelector } from "../../../hook/store";
import { confirm } from "../../../services/calendar/confirm";
import { useState } from "react";
import { SetLoader } from "../../../types";

export default function Calendar({ setLoader }: { setLoader: SetLoader }) {
    const { day, setDay, month, setMonth, actualYear, setActualYear, selectDay, setSelectDay } = useCalendar()
    const { updateShiftsUser } = useUserActions()
    const { id, GymId } = useAppSelector(state => state.user)
    const [defaultTime, setDefaultTime] = useState<string>()

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
                <label>
                    Seleccionar hora:
                    <input type="time" value={defaultTime} onChange={(e) => {
                        setDefaultTime(e.target.value)
                        setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour: e.target.value })
                    }
                    }></input>
                </label>
                <button className={style.button} onClick={() => {
                    confirm({ GymId, id, selectDay, setLoader, updateShiftsUser })
                    setDefaultTime('')
                }
                }>Confirmar</button>
            </div>
        </div>
    )
}