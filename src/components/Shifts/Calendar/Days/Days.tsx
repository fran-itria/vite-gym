/* eslint-disable react-hooks/exhaustive-deps */
import { year } from "../../Const"
import moment from "moment";
import style from './Days.module.css'
import { useEffect, useMemo, useState } from "react";
import { DaysProps } from "../../../../types";
import axios from "axios";
import { useAppSelector } from "../../../../hook/store";

export default function Days({ month, day, setDay, actualYear, GymId, limit }: DaysProps) {
    const [shiftsMonth, setShiftsMonth] = useState<{ day: string, hour: string }[]>([])
    const daysInMonth = useMemo<(number | undefined)[]>(() => {
        const startDate = moment().date(1).month(month).year(actualYear).startOf("month").weekday();
        const daysInMonth = [...Array(year[month].days).keys()]
        return [...Array(startDate), ...daysInMonth];
    }, [month])
    const { Shifts } = useAppSelector(state => state.user)

    useEffect(() => {
        async function getShiftsMonth() {
            const monthParam = month < 10 ? `0${month + 1}` : month + 1
            const response = await axios.get(`/shift/getShiftsMonth/${GymId}/${monthParam}`)
            setShiftsMonth(response.data)
        }
        getShiftsMonth()
    }, [month, Shifts])

    useEffect(() => { console.log(shiftsMonth, limit) }, [shiftsMonth])
    return (
        <>
            {month !== undefined ? daysInMonth.map((dayMonth, index) => {
                if (dayMonth === undefined) return (
                    <div></div>
                );
                return (
                    <div
                        className={
                            dayMonth == (day - 1) ?
                                style.daySelected
                                :
                                (index) % 7 === 0 ?
                                    style.dayOff
                                    :
                                    shiftsMonth.filter(shift => {
                                        return shift.day.split('-')[2] === (dayMonth + 1 < 10 ? `0${dayMonth + 1}` : `${dayMonth + 1}`)
                                    }).length >= (limit ? limit : 1) ?
                                        style.dayComplete
                                        :
                                        style.dayMonth
                        }
                        onClick={() => setDay(dayMonth + 1)}>
                        <p className={style.dayMonthText}>
                            {(dayMonth + 1).toString().length < 2 && "0"}{dayMonth + 1}
                        </p>
                    </div>
                )
            }) : <></>}
        </>
    )
}