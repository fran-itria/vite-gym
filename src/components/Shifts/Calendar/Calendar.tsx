/* eslint-disable react-hooks/exhaustive-deps */
import useCalendar from "../../../hook/Components/Calendar/useCalendar";
import Month from "./Month/Month";
import style from './Calendar.module.css'
import Week from "./Week/Week";
import Days from "./Days/Days";

import { confirm } from "../../../services/calendar/confirm";
import { SetLoader } from "../../../types";

import Hours from "./Hours/Hours";

export default function Calendar({ setLoader, range, limit }: { setLoader: SetLoader, range: string[] | undefined, limit: number | null }) {
    const {
        day,
        setDay,
        month,
        setMonth,
        actualYear,
        setActualYear,
        selectDay,
        setSelectDay,
        updateShiftsUser,
        defaultTime,
        setDefaultTime,
        hoursRange,
        GymId,
        id
    } = useCalendar()

    return (
        <div className="ll:w-full flex items-center flex-col ">
            <div className="w-full flex items-center justify-center">
                <Month month={month} setMonth={setMonth} setActualYear={setActualYear} />
            </div>
            <div className={style.calendar}>
                <Week />
                <Days month={month} day={day} setDay={setDay} actualYear={actualYear} GymId={GymId} limit={limit && range ? (limit * range?.length) : limit} />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <Hours
                    range={range}
                    hoursRange={hoursRange}
                    limit={limit}
                    setSelectDay={setSelectDay}
                    setDefaultTime={setDefaultTime}
                    defaultTime={defaultTime}
                    actualYear={actualYear}
                    month={month}
                    day={day}
                    selectDay={selectDay}
                />
                <button className="buttonConfirm mt-5 mb-5 w-24" onClick={() => {
                    confirm({ GymId, id, selectDay, setLoader, updateShiftsUser })
                    setDefaultTime('')
                }
                }>Confirmar</button>
            </div>
        </div>
    )
}