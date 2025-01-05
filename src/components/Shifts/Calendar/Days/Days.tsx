/* eslint-disable react-hooks/exhaustive-deps */
import { year } from "../../Const"
import moment from "moment";
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
    const dayMonthStyle = 'flex justify-center items-center rounded-full h-8 w-12 ll:w-10'
    return (
        <>
            {month !== undefined && daysInMonth.map((dayMonth, index) => {
                if (dayMonth === undefined) return (
                    <div></div>
                );
                return (
                    <div className="flex justify-center">
                        <div
                            className={
                                dayMonth == (day - 1) ?
                                    `${dayMonthStyle} bg-cyan-700`
                                    :
                                    (index) % 7 === 0 ?
                                        `${dayMonthStyle} bg-gray-500 pointer-events-none`
                                        :
                                        limit && shiftsMonth.filter(shift => {
                                            return shift.day.split('-')[2] === (dayMonth + 1 < 10 ? `0${dayMonth + 1}` : `${dayMonth + 1}`)
                                        }).length >= (limit ? limit : 1) ?
                                            `${dayMonthStyle} pointer-events-none bg-gray-500 border border-black opacity-50`
                                            :
                                            `${dayMonthStyle} bg-cyan-950`
                            }
                            onClick={() => setDay(dayMonth + 1)}>
                            <b className="text-xl">
                                {(dayMonth + 1).toString().length < 2 && "0"}{dayMonth + 1}
                            </b>
                        </div>
                    </div>
                )
            })}
        </>
    )
}